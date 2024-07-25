import { TranslateGeminiResponse } from "@/app/translate/actions/translateAction";
import WordBlock from "@/app/translate/components/wordBlock";
import { useState } from "react";

type TranslateOutputProps = {
  data?: TranslateGeminiResponse;
};

export default function TranslateOutput({ data }: TranslateOutputProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  return (
    <>
      {data && (
        <div className="grid grid-cols-2 gap-2">
          <div className="border-l-2 pl-2 flex flex-col gap-4">
            <div className="text-2xl font-bold">English</div>
            <div className="flex flex-row flex-wrap gap-x-1">
              {data.english.map(({ id, word, pronunciation, references }) => (
                <WordBlock
                  key={id}
                  word={word}
                  pronunciation={pronunciation}
                  isSelected={id === hoveredId}
                  onMouseEnter={() => setHoveredId(references)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              ))}
            </div>
          </div>
          <div className="border-l-2 pl-2 flex flex-col gap-4">
            <div className="text-2xl font-bold">Chinese</div>
            <div className="flex flex-row flex-wrap gap-x-1">
              {data.chinese.map(({ id, word, pronunciation, references }) => (
                <WordBlock
                  key={id}
                  word={word}
                  pronunciation={pronunciation}
                  isSelected={id === hoveredId}
                  onMouseEnter={() => setHoveredId(references)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
