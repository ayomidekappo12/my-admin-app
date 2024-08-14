import React, { useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";

interface PrimaryTextAreaProps {
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  title?: string;
  id: string;
  lines?: number;
  help?: string;
  defaultValue?: string;
}

const PrimaryTextArea = ({
  onChange,
  placeholder,
  title,
  id,
  lines = 2,
  className,
  help,
  defaultValue,
}: PrimaryTextAreaProps) => {
  useEffect(() => {
    if (defaultValue != null) {
      const input = document.getElementById(id) as HTMLInputElement;
      input?.focus();
      input?.setSelectionRange(input.value.length, input.value.length);
    }
  }, [defaultValue, id]);

  return (
    <div className={cn("max-w-screen-sm", className)}>
      <label htmlFor={id} className="text-sm font-medium text-[#979797]">
        {title}
      </label>
      <Textarea
        id={id}
        className="rounded-[10px] focus:outline-none focus-visible:ring-transparent block text-sm placeholder:text-slate-300 my-1"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        defaultValue={defaultValue}
        rows={lines}
      />
      {help && (
        <p className="text-xs flex pt-2 pl-3.5 font-regular text-gray-400">
          {help}
        </p>
      )}
    </div>
  );
};

export default PrimaryTextArea;
