import clsx from "clsx";
import type { ChangeEvent } from "react";

interface SearchInputProps {
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  subject: "Employee" | "Policy";
}

export default function SearchInput(props: SearchInputProps) {
  const clientClassName = `${props.className}` || "";
  return (
    <div className={clsx("search-input-container", clientClassName)}>
      <input
        type="text"
        placeholder={`Search ${props.subject}...`}
        className="h-12 rounded-3xl border-3 border-border-2 text-center text-[1.125rem] transition-colors focus:border-transparent focus:ring-3 focus:ring-focus-ring focus:outline-none"
        onChange={props.onChange}
      />
    </div>
  );
}
