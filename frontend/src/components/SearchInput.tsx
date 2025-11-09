import clsx from 'clsx';

interface SearchInputProps {
  className?: string;
}

export default function SearchInput(props: SearchInputProps) {
  const clientClassName = `${props.className}` || "";
  return (
    <div className={clsx("search-input-container", clientClassName)}>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
      />
    </div>
  );
}
