import type { ChangeEvent } from "react";
import Dropdown from "./Dropdown";
import SearchInput from "./SearchInput";
import clsx from "clsx";

interface HeaderProps {
  children?: React.ReactNode;
  button: React.ReactNode;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  dropdownOptions?: string[];
  dropdownValue?: string;
  onDropdownChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  dropdownPlaceholder?: string;
  subject: "Employee" | "Policy";
}

export default function Header(props: HeaderProps) {
  const clientClassName = `${props.className}` || "";
  return (
    <header
      className={clsx(
        "app-header",
        clientClassName,
        "flex h-[13svh] w-[90svw] items-center justify-between px-6 py-4 text-foreground",
      )}
    >
      <h1 className="text-3xl font-bold">{props.children}</h1>
      <div className="flex w-[50%] justify-end gap-5">
        <SearchInput onChange={props.onChange} subject={props.subject}/>
        {props.dropdownOptions &&
          props.onDropdownChange &&
          props.dropdownValue !== undefined &&
          props.dropdownPlaceholder && (
            <Dropdown
              options={props.dropdownOptions}
              value={props.dropdownValue}
              onChange={props.onDropdownChange}
              placeholder={props.dropdownPlaceholder}
            />
          )}
        {props.button}
      </div>
    </header>
  );
}
