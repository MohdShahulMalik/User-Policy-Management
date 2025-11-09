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
    setFormData({});
    dialogRef.current?.close();
  };

  const handleChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const renderField = (field: FormFields, index: number) => {
    const inputClasses = "w-full px-3 py-2 border border-border-default rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors";
    
    switch (field.type) {
      case "select":
        return (
          <select
            className={clsx(inputClasses, "bg-surface-700 cursor-pointer appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTEgMSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px] bg-[right_1.125rem_center] bg-no-repeat pr-10")}
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
            className={inputClasses}
            type={field.type}
            value={formData[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            required
          />
        );
    }
  };

  return (
    <dialog
      className={clsx(
        clientClassName,
        "fixed top-1/2 left-1/2 m-0 max-h-[80vh] w-100 -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-lg p-6",
      )}
      ref={dialogRef}
    >
      <h1 className="font-bold text-[1.25rem]">{props.heading}</h1>
      <hr className="my-4"/>
      <form className="grid gap-3" onSubmit={handleSubmit}>
        {props.config.map((field: FormFields, index: number) => (
          <div className = "grid gap-1" key={index}>
            <label>{field.label}</label>
            {renderField(field, index)}
          </div>
        ))}
        <article className="flex gap-2">
          <Button
            text={buttonText}
            size="medium"
            type="submit"
          />
          <Button
            size="medium"
            text="Cancel"
            type="button"
            formNoValidate
            onClick={() => dialogRef.current?.close()}
          />
        </article>
      </form>
    </dialog>
  );
});

export interface ConfirmModalHandle {
  open: () => void;
}

interface ConfirmModalProps {
  onConfirm: () => void;
  heading: "Employee" | "Policy";
}

const ConfirmModal = forwardRef<ConfirmModalHandle, ConfirmModalProps>(
  (props, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        dialogRef.current?.showModal();
      },
    }));

    const handleConfirm = (e: FormEvent) => {
      e.preventDefault();
      props.onConfirm();
      dialogRef.current?.close();
    };

    return (
      <dialog
        className="fixed top-1/2 left-1/2 m-0 w-96 -translate-x-1/2 -translate-y-1/2 rounded-lg p-6"
        ref={dialogRef}
      >
        <h1 className="font-bold text-[1.25rem]">Delete {props.heading}</h1>
        <form className="grid gap-4" onSubmit={handleConfirm}>
          <p>This action cannot be undone</p>
          <article className="flex gap-2">
            <Button
              text="Cancel"
              size="medium"
              type="button"
              onClick={() => dialogRef.current?.close()}
            />
            <Button
              text="Delete"
              size="medium"
              type="submit"
            />
          </article>
        </form>
      </dialog>
    );
  },
);

export default Modal;
export { ConfirmModal };
