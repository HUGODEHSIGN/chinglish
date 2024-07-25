import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AnchorHTMLAttributes } from "react";

type WordBlockProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  word: string;
  pronunciation: string;
  isSelected?: boolean;
};

export default function WordBlock({
  word,
  pronunciation,
  isSelected,
  onMouseEnter,
  onMouseLeave,
}: WordBlockProps) {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger
          className={`cursor-default border-b-2 transition-colors hover:border-red-500 ${
            isSelected ? "border-red-500" : "border-transparent"
          }`}
          onMouseEnter={onMouseEnter}
          onMouseOut={onMouseLeave}
        >
          {word}
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="text-xl font-bold">{word}</div>
          <p>{pronunciation}</p>
          {/* <div>id: {id}</div>
          <div>references: {references}</div> */}
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
