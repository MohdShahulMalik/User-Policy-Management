import type { ChangeEvent } from 'react';
import Button from './Button';
import SearchInput from './SearchInput';
import clsx from 'clsx';

interface HeaderProps {
  children?: React.ReactNode;
  button: React.ReactNode;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Header(props: HeaderProps) {
  const clientClassName = `${props.className}` || "";
  return (
    <header className={clsx("app-header", clientClassName, "w-[90svw] flex justify-between h-[13svh] py-4 px-6 items-center")}>
      <h1 className="font-bold text-3xl">
        {props.children}
      </h1>
      <div className="flex gap-5 w-[30%] justify-end">
        <SearchInput onChange = {props.onChange}/>
        {props.button}
      </div>
    </header>
  );
}
