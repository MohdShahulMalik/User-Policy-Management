import type { Users, Policies } from "../types/tables";

interface ModalProps {
  table: Users | Policies;
  className?: string;
}

export default function Modal(props: ModalProps) {

  const clientClassName = `${props.className || ""}.trim()`;

  return (
    <dialog className={clientClassName}>
      <form>
        {Object.keys(props.table).map((key: string) => (
          <div>
            <label>{key}</label>
            <input type="text" />
          </div>
        ))}
      </form>
    </dialog>
  );
}
