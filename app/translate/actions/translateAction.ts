"use server";

import { model } from "@/ai/gemini";

type Translation = {
  english: string;
  chinese: string;
};

async function getTranslation(text: string): Promise<Translation> {
  const prompt = `Translate this text from either English or Chinese to the other language. 
  Provide both languages in this schema: 

  '{english: string, chinese: string}'. 

  Here is the text: ${text}
`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}

type Alignment = {
  english: string;
  chinese: string;
};

async function getAlignment({
  english,
  chinese,
}: Translation): Promise<string> {
  const prompt = `Split and match the following sentences word by word or by short phrases.
  Order and pair each phrase such that each pair are direct translations of each other.
  You may have to reorder some of the phrases in one, or both languages for the translations to match up.
  For example, given the sentences: 

'I love running the most' and '我最愛跑步',

the result should be:

'[{english: 'I', chinese: '我'}, {english: 'love', chinese: '愛'}, {english: 'running', chinese: '跑步'}, {english: 'the most', chinese: '最'}]'

Here's the schema again: 

[{english: string, chinese: string}]

Here's the English text: ${english}
Here's the Chinese text: ${chinese}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

async function checkAlignment(
  json: string,
  english: string,
  chinese: string
): Promise<Alignment[]> {
  const prompt = `Double check data in this json snippet. 
  Each English to Chinese pairing should match each other in translation and definition.
  Here's the data: ${json}
  
  In addition, here are the original sentences so you know where to pull words and characters from.
  Do not make up new phrases or characters. Only use what's been provided in the sentences.

  English: ${english}
  Chinese: ${chinese}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}

async function parseAlignment(data: Alignment[]) {
  const english = data.map(({ english }, index) => ({
    word: english,
    id: index * 2 + 1,
    references: index * 2 + 2,
  }));

  const chinese = data.map(({ chinese }, index) => ({
    word: chinese,
    id: index * 2 + 2,
    references: index * 2 + 1,
  }));

  return { english, chinese };
}

type ParsedAlignment = {
  english: {
    word: string;
    id: number;
    references: number;
  }[];
  chinese: {
    word: string;
    id: number;
    references: number;
  }[];
};

async function joinAlignment(
  english: string,
  chinese: string,
  data: ParsedAlignment
) {
  const prompt = `
  I have two original sentences, one in English and one in Chinese. 
  Along with a set of data. 
  The data is segments from these two original sentences, 
  but are now out of order due to some computations I had to do. 
  Help me reorder the english and chinese arrays based on their word attribute in this json string: 

  ${JSON.stringify(data)}

  according to this english sentence: ${english},
  and this chinese sentence: ${chinese}.

  Be sure that only the English entries are placed in the english array, and the Chinese entries are placed in the chinese array.

  Finally, go through each element in the both the English and the Chinese array and add pronunciation to each word or phrase. Use IPA phonetic transcription for the American pronuncation of the english words and PinYin for Chinese.
  Send back the data in this schema: 
  '{english: [{id: number, word: string, pronunciation: string, references: number}], chinese: [{id: number, word: string, pronunciation: string, references: number}]}'
  `;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}

export default async function translateAction(
  currentState: any,
  formData: FormData
) {
  const translation = await getTranslation(formData.get("text-area") as string);

  const alignment = await getAlignment(translation);

  const checkedAlignment = await checkAlignment(
    alignment,
    translation.english,
    translation.chinese
  );

  const parsedAlignment = await parseAlignment(checkedAlignment);

  const finalData = await joinAlignment(
    translation.english,
    translation.chinese,
    parsedAlignment
  );

  console.log(translation);

  return {
    status: "success",
    data: finalData,
  };
}

export type TranslateGeminiResponse = {
  english: WordBlock[];
  chinese: WordBlock[];
};

export type WordBlock = {
  id: number;
  word: string;
  pronunciation: string;
  references: number | null;
};
