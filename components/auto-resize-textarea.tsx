"use client";

import { Textarea } from "@/components/ui/textarea";

import { TextareaHTMLAttributes, useEffect, useRef, useState } from "react";

type AutoResizeTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function AutoResizeTextArea({
  name = "text-area",
  ...props
}: AutoResizeTextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState("");

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextArea();
    window.addEventListener("resize", resizeTextArea);
    return () => window.removeEventListener("resize", resizeTextArea);
  }, []);

  useEffect(() => {
    resizeTextArea();
  }, [value]);

  return (
    <Textarea
      ref={textAreaRef}
      value={value}
      name={name}
      onChange={(e) => setValue(e.target.value)}
      className="resize-none overflow-hidden min-h-[24px]"
      rows={1}
      {...props}
    />
  );
}
