import AutoResizeTextarea from "@/components/auto-resize-textarea";
import { forwardRef, useEffect } from "react";
import { useFormStatus } from "react-dom";

const TranslateInput = forwardRef<HTMLTextAreaElement, { disabled: boolean }>(
  (props, ref) => {
    const { pending } = useFormStatus();

    useEffect(() => {
      console.log("isPending");
    }, [pending]);

    return (
      <AutoResizeTextarea
        ref={ref}
        name="content"
        placeholder="Enter text to translate"
        className="w-full resize-none overflow-hidden"
        {...props}
      />
    );
  }
);

TranslateInput.displayName = "TranslateInput";

export default TranslateInput;
