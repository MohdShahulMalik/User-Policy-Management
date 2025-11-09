import clsx from 'clsx';
import type { ChangeEvent } from 'react';

interface SearchInputProps {
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput(props: SearchInputProps) {
  const clientClassName = `${props.className}` || "";
  return (
    <div className={clsx("search-input-container", clientClassName)}>
      <input
        type="text"
        placeholder="Search Employee..."
        className="h-12 text-[1.125rem] text-center border-3 border-border-2 rounded-md focus:outline-none focus:ring-3 focus:ring-focus-ring focus:border-transparent transition-colors"
        onChange={props.onChange}
      />
    </div>
  );
}
