import {
  useState,
  useRef,
  type FormEvent,
  forwardRef,
  useImperativeHandle,
} from "react";
import type { FormFields } from "../types/utils";
import Button from "./Button";
import clsx from "clsx";

interface ModalProps {
  config: FormFields[];
  className?: string;
  heading:
    | "Add Employees"
    | "Add Policies"
    | "Edit Employees"
    | "Edit Policies";
  onClick: (formData: Record<string, string>) => void;
  initialData?: Record<string, string>;
}

export interface ModalHandle {
  open: (initialData?: Record<string, string>) => void;
}

const Modal = forwardRef<ModalHandle, ModalProps>((props, ref) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const clientClassName = `${props.className || ""}.trim()`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonText = props.heading.split(" ")[0];

  useImperativeHandle(ref, () => ({
    open: (initialData?: Record<string, string>) => {
      if (initialData) {
        setFormData(initialData);
      }
      dialogRef.current?.showModal();
    },
  }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onClick(formData);
    dialogRef.current?.close();
  };

  const handleChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const renderField = (field: FormFields, index: number) => {
    switch (field.type) {
      case "select":
        return (
          <select
            value={formData[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            required
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={field.type}
            value={formData[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            required
          />
        );
    }
  };

  return (
    <dialog className={clsx(clientClassName,
    "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0")} ref={dialogRef}>
      <h2>{props.heading}</h2>
      <form>
        {props.config.map((field: FormFields, index: number) => (
          <div key={index}>
            <label>{field.label}</label>
            {renderField(field, index)}
          </div>
        ))}
        <Button
          text={buttonText}
          size="medium"
          type="submit"
          onClick={handleSubmit}
        />
        <Button size="medium" text="Cancel" type="submit" formMethod="dialog" />
      </form>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </dialog>
  );
});

export interface ConfirmModalHandle {
  open: () => void;
}

interface ConfirmModalProps {
  onConfirm: () => void;
  heading: "Employee" | "Policy"
}

const ConfirmModal = forwardRef<ConfirmModalHandle, ConfirmModalProps>((props, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        dialogRef.current?.showModal();
      }
    }))

    const handleConfirm = () => {
      props.onConfirm();
      dialogRef.current?.close();
    }

    return (
      <dialog ref={dialogRef}>
        <form>
          <h1>Delete {props.heading}</h1>
          <p>This action cannot be undone</p>
          <article>
            <Button text="Cancel" size="medium" formMethod="dialog" type="submit" />
            <Button text="Delete" size="medium" onClick={handleConfirm} type="submit" />
          </article>
        </form>
      </dialog>
    )
  
})

export default Modal;
export { ConfirmModal };
