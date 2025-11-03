import clsx from "clsx";
import type { MouseEventHandler } from "react";

interface ButtonProps {
  className?: string;
  text: string;
  formMethod?: "dialog";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button" | "reset";
}

export default function Button(props: ButtonProps) {
  const clientClassName = `${props.className || ""}`;

  return (
    <button
      type={props.type || "button"}
      className={clsx(
        "cursor-pointer content-center rounded-3xl bg-blue-300 px-4 pt-2.5 pb-3 text-center text-[1.125rem] text-foreground transition duration-300 hover:bg-blue-400 active:bg-blue-300",
        clientClassName,
      )}
      formMethod={props.formMethod}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
