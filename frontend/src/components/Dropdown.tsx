import clsx from "clsx";
import type { ChangeEvent } from "react";

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  className?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder,
  className,
}: DropdownProps) {
  const selectClasses =
    "px-3 h-12 border-3 border-border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-surface-700 cursor-pointer appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTEgMSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px] bg-[right_1.125rem_center] bg-no-repeat pr-10 text-[1.125rem]";

  return (
    <select
      className={clsx(selectClasses, className)}
      value={value}
      onChange={onChange}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
