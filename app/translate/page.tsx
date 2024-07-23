import { model } from '@/ai/gemini';

export default async function page() {
  const prompt = 'Write a story about an AI and magic';

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return <div>{text}</div>;
}
