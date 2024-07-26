"use client";

import TranslateInput from "@/app/translate/components/translate-input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";

import TranslateOutput from "@/app/translate/components/translate-output";
import translateAction from "../actions/translateAction";

export default function Translate() {
  const [state, formAction, isPending] = useActionState(translateAction, null);
  const { data, status } = state || {};

  const ref = useRef<HTMLFormElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handleKeystroke = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const form = ref.current;
        if (form && !isPending) {
          const formData = new FormData(form);
          formAction(formData);
          // Reset the textarea value and trigger resize
          if (textareaRef.current) {
            textareaRef.current.value = "";
            textareaRef.current.style.height = "auto";
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeystroke);

    return () => {
      window.removeEventListener("keydown", handleKeystroke);
    };
  }, [formAction, isPending]);

  return (
    <>
      <div className="flex flex-col gap-16">
        <h1 className="text-4xl font-bold">Translate</h1>
        <form ref={ref} action={formAction} className="flex flex-row gap-2">
          <TranslateInput ref={textareaRef} disabled={isPending} />
          <Button
            type="submit"
            size="icon"
            className="h-auto"
            disabled={isPending}
          >
            <Send size={20} />
          </Button>
        </form>
        <TranslateOutput data={data} />
      </div>
    </>
  );
}
