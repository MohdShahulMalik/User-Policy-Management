import Button from './Button';
import SearchInput from './SearchInput';
import clsx from 'clsx';

interface HeaderProps {
  children?: React.ReactNode;
  button: React.ReactNode;
  className?: string;
}

export default function Header(props: HeaderProps) {
  const clientClassName = `${props.className}` || "";
  return (
    <header className={clsx("app-header", clientClassName)}>
      <div className="header-left">
        {props.children}
      </div>
      <div className="header-right">
        <SearchInput />
        {props.button}
      </div>
    </header>
  );
}
