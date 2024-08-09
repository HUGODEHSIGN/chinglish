"use server";

import { openai } from "@/ai/openai";
import invariant from "tiny-invariant";

export default async function translateAction(
  currentState: any,
  formData: FormData
) {
  // const translation = await getTranslation(formData.get("content") as string);

  const from = 'english';

  const to = 'chinese'

  const systemPrompt = `You are a teacher helping a student learn a new language. Parse through the text that is provided by the user by following these steps, in the process, translating the language from ${from} to ${to}. 
    1. Translate the text from ${from} to ${to}.
    2. Split up the text into words or short phrases, such that the resulting words or phrases can be directly matched between the two languages.
    3. Assign each word or phrase with an id in the form of a number. These ids should be unique even amongst the two languages.
    4. Match up the words or phrases by assigning each word or phrase with an additional property called 'references'. This property references the word in the other languages that is a direct translation to each word.
    5. Give each word or phrase a property called 'pronunciation', where you will provide the pronunciation for each word.
    6. Return the sentences in this JSON schema: 
    {"from": [{"id": number, "word": string, "pronunciation": string, "references": number}], "to": [{"id": number, "word": string, "pronunciation": string, "references": number}]}.
    Do not wrap the json codes in JSON markers.
  `

  const res = await openai.chat.completions.create({
    messages: [
      {'role': 'system', 'content': systemPrompt},
      {'role': 'user', 'content': formData.get('content') as string}
    ],
    model: 'gpt-4o-2024-08-06'
  })

  const content = res.choices[0].message.content
console.log(content);
  invariant(content, 'No Content')

  const data = JSON.parse(content);

  return {
    status: "success",
    data,
  };
}

export type TranslateGeminiResponse = {
  from: WordBlock[];
  to: WordBlock[];
};

export type WordBlock = {
  id: number;
  word: string;
  pronunciation: string;
  references: number | null;
};
