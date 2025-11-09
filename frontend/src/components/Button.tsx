import clsx from "clsx";
import type { MouseEventHandler } from "react";

interface ButtonProps {
  className?: string;
  text: string;
  formMethod?: "dialog";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button" | "reset";
  size: "small" | "medium";
  formNoValidate?: boolean;
}

export default function Button(props: ButtonProps) {
  const clientClassName = `${props.className || ""}`;

  return (
    <button
      type={props.type || "button"}
      className={clsx(
        clientClassName,
        "cursor-pointer content-center rounded-3xl bg-blue-300 text-center text-foreground transition duration-300 hover:bg-blue-400 active:bg-blue-300",
        {
          "px-4 pt-2.5 pb-3 text-[1.125rem]": props.size === "medium",
          "px-2 pt-0.5 pb-1.5 text-[1rem]": props.size === "small",
        },
      )}
      formMethod={props.formMethod}
      onClick={props.onClick}
      formNoValidate={props.formNoValidate}
    >
      {props.text}
    </button>
  );
}
