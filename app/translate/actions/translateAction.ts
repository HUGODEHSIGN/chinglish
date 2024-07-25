"use server";

import { model } from "@/ai/gemini";

export default async function translateAction(
  currentState: any,
  formData: FormData
) {
  // const prompt = `Translate the text from either english or chinese to the other
  //   language and return the data
  //   for both languages along with some additional data.
  //   I want you to split up each word so that I can have pronunciation and an id for each word.
  //   Use IPA phonetic transcription for english pronunciations and pinyin for chinese.
  //   In addition, there should be a references field for each word that contains the id of the word from the other language that it matches.
  //   For example, the sentence, 'I like to run' would likely be translated to '我喜欢跑步。' With 'I' referencing '我', 'like' referencing '喜欢', and 'run' referencing '跑步' and vise versa.
  //   Make sure to include all puncutation
  //   and leave their pronunciations null.
  //   Return the data in this schema:
  //   '{english: [{id: number, word: string, pronunciation: string | null, references: number | null}], chinese: [{id: number, word: string, pronunciation: string | null, references: number | null}]}'
  //   here is the text to translate: ${formData.get("text-area")}
  //   `;
  const prompt = `
  Translate the text from either English or Chinese to the other language. Provide the translation in both languages and split each word to include the following details:
    1. 'id': A unique number used to identify words between both languages. English ids will be odd, while chinese ids will be even.
    2. 'word': The word itself.
    3. 'pronunciation': Use the IPA phonetic transcription for English and pinyin for Chinese. Set to 'null' for punctuation.
    4. 'references': The 'id' of the corresponding word in the other language. Set to 'null for punctuation.
    Include all punctuation in the output, with 'null' pronunciation and 'null' references. Return the data in this schema: 

    '{english: [{id: number, word: string, pronunciation: string | null, references: number | null}], chinese: [{id: number, word: string, pronunciation: string | null, references: number | null}]}'

    Please cross check that each word corresponds to the correct reference before sending data back here.
    Here is the text: ${formData.get("text-area")}
  `;
  // const result = await model.generateContent(prompt);
  // const response = await result.response;
  // const text = response.text();
  // console.log(text);
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  const data: TranslateGeminiResponse = JSON.parse(text);
  console.log(text);

  return {
    status: "success",
    data: data,
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
