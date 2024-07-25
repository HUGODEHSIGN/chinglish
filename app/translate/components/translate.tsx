"use client";

import TranslateInput from "@/app/translate/components/translate-input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useActionState } from "react";

import TranslateOutput from "@/app/translate/components/translate-output";
import translateAction from "../actions/translateAction";

export default function Translate() {
  const [state, formAction, isPending] = useActionState(translateAction, null);
  const { data, status } = state || {};
  console.log(data);
  return (
    <>
      <div className="flex flex-col gap-16">
        <h1 className="text-4xl font-bold">Translate</h1>
        <form action={formAction} className="flex flex-row gap-2">
          <TranslateInput />
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
