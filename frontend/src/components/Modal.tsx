import {
  useState,
  useRef,
  type FormEvent,
  forwardRef,
  useImperativeHandle,
} from "react";
import type { FormFields } from "../types/utils";
import Button from "./Button";

interface ModalProps {
  config: FormFields[];
  className?: string;
  heading: string;
}

export interface ModalHandle {
  open: () => void;
}

const Modal = forwardRef<ModalHandle, ModalProps>((props, ref) => {
  const clientClassName = `${props.className || ""}.trim()`;
  const [formData, setFormData] = useState<Record<string, string>>({});
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current?.showModal();
    },
  }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
          />
        );
    }
  };

  return (
    <dialog className={clientClassName} ref={dialogRef}>
      <h2>{props.heading}</h2>
      <form>
        {props.config.map((field: FormFields, index: number) => (
          <div key={index}>
            <label>{field.label}</label>
            {renderField(field, index)}
          </div>
        ))}
        <Button text="Add" type="submit" onClick={handleSubmit} />
        <Button
          text="Cancel"
          type="submit"
          formMethod="dialog"
          onClick={handleSubmit}
        />
      </form>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </dialog>
  );
});

export default Modal;
