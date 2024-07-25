import Translate from "./components/translate";

export default async function page() {
  return (
    <div>
      <Translate />
    </div>
  );
}

// const prompt = "Write a story about an speakers";

// const result = await model.generateContent(prompt);
// const response = await result.response;
// const text = response.text();
// console.log(text);
