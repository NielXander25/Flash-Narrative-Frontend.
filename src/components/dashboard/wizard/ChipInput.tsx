import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  validate?: (value: string) => boolean;
}

export function ChipInput({ values, onChange, placeholder, validate }: Props) {
  const [draft, setDraft] = useState("");

  const commit = () => {
    const v = draft.trim();
    if (!v) return;
    if (validate && !validate(v)) return;
    if (values.includes(v)) {
      setDraft("");
      return;
    }
    onChange([...values, v]);
    setDraft("");
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit();
    } else if (e.key === "Backspace" && !draft && values.length) {
      onChange(values.slice(0, -1));
    }
  };

  const remove = (v: string) => onChange(values.filter((x) => x !== v));

  return (
    <div className="flex min-h-[42px] flex-wrap items-center gap-1.5 rounded-md border border-input bg-secondary/40 px-2 py-1.5">
      {values.map((v) => (
        <span
          key={v}
          className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary"
        >
          {v}
          <button
            type="button"
            onClick={() => remove(v)}
            className="rounded-full hover:bg-primary/20"
            aria-label={`Remove ${v}`}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <Input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKey}
        onBlur={commit}
        placeholder={values.length ? "" : placeholder}
        className="h-7 flex-1 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0"
      />
    </div>
  );
}
