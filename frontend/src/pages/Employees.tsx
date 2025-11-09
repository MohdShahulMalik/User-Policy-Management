import { useRef, useState } from "react";
import Modal, {
  type ModalHandle,
  ConfirmModal,
  type ConfirmModalHandle,
} from "../components/Modal";
import Button from "../components/Button";
import { employeeFormConfig } from "../utils/formConfig";
import Header from "../components/Header";
import Table from "../components/Table";
import { v4 as uuidv4 } from "uuid";
import type { Employees } from "../types/tables";

export default function Employees() {
  const [employeesData, setEmployeesData] = useState<Employees[]>([
    {
      id: { tb: "employees", id: { String: "a1b2c3d4-e5f6-7890-1234-567890abcdef" } },
      name: { first_name: "John", last_name: "Doe" },
      email: "john.doe@example.com",
      role: "Admin",
    },
    {
      id: { tb: "employees", id: { String: "b2c3d4e5-f6a7-8901-2345-67890abcdef0" } },
      name: { first_name: "Jane", last_name: "Smith" },
      email: "jane.smith@example.com",
      role: "User",
    },
    {
      id: { tb: "employees", id: { String: "c3d4e5f6-a7b8-9012-3456-7890abcdef01" } },
      name: { first_name: "Peter", last_name: "Jones" },
      email: "peter.jones@example.com",
      role: "User",
    },
    {
      id: { tb: "employees", id: { String: "d4e5f6a7-b8c9-0123-4567-890abcdef012" } },
      name: { first_name: "Susan", last_name: "Williams" },
      email: "susan.williams@example.com",
      role: "Viewer",
    },
    {
      id: { tb: "employees", id: { String: "e5f6a7b8-c9d0-1234-5678-90abcdef0123" } },
      name: { first_name: "David", last_name: "Brown" },
      email: "david.brown@example.com",
      role: "User",
    },
    {
      id: { tb: "employees", id: { String: "f6a7b8c9-d0e1-2345-6789-0abcdef01234" } },
      name: { first_name: "Mary", last_name: "Miller" },
      email: "mary.miller@example.com",
      role: "User",
    },
    {
      id: { tb: "employees", id: { String: "a7b8c9d0-e1f2-3456-7890-abcdef012345" } },
      name: { first_name: "Michael", last_name: "Davis" },
      email: "michael.davis@example.com",
      role: "Admin",
    },
    {
      id: { tb: "employees", id: { String: "b8c9d0e1-f2a3-4567-8901-bcdef0123456" } },
      name: { first_name: "Jennifer", last_name: "Garcia" },
      email: "jennifer.garcia@example.com",
      role: "User",
    },
    {
      id: { tb: "employees", id: { String: "c9d0e1f2-a3b4-5678-9012-cdef01234567" } },
      name: { first_name: "William", last_name: "Rodriguez" },
      email: "william.rodriguez@example.com",
      role: "Viewer",
    },
    {
      id: { tb: "employees", id: { String: "d0e1f2a3-b4c5-6789-0123-def012345678" } },
      name: { first_name: "Linda", last_name: "Martinez" },
      email: "linda.martinez@example.com",
      role: "User",
    },
    {
      id: { tb: "employees", id: { String: "e1f2a3b4-c5d6-7890-1234-ef0123456789" } },
      name: { first_name: "Richard", last_name: "Hernandez" },
      email: "richard.hernandez@example.com",
      role: "User",
    },
    {
      id: { tb: "employees", id: { String: "f2a3b4c5-d6e7-8901-2345-f01234567890" } },
      name: { first_name: "Karen", last_name: "Lopez" },
      email: "karen.lopez@example.com",
      role: "Admin",
    },
    {
      id: { tb: "employees", id: { String: "a3b4c5d6-e7f8-9012-3456-01234567890a" } },
      name: { first_name: "Joseph", last_name: "Gonzalez" },
      email: "joseph.gonzalez@example.com",
      role: "User",
    },
    {
      id: { tb: "employees", id: { String: "b4c5d6e7-f8a9-0123-4567-1234567890ab" } },
      name: { first_name: "Jessica", last_name: "Perez" },
      email: "jessica.perez@example.com",
      role: "Viewer",
    },
  ]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const addEmployeeModalRef = useRef<ModalHandle>(null);
  const editEmployeeModalRef = useRef<ModalHandle>(null);
  const deletingEmployeeModalRef = useRef<ConfirmModalHandle>(null);

  const handleAddingEmployees = (formData: Record<string, string>) => {
    const newRecord: Employees = {
      id: {
        tb: "employees",
        id: {
          String: uuidv4(),
        },
      },
      name: {
        first_name: formData["0"],
        last_name: formData["1"],
      },
      email: formData["2"],
      role: formData["3"],
    };
    setEmployeesData((prev) => [...prev, newRecord]);
  };

  const handleEditingEmployee = (formData: Record<string, string>) => {
    if (editingIndex === null) return;

    setEmployeesData((prev) => {
      prev[editingIndex].name = {
        first_name: formData["0"],
        last_name: formData["1"],
      };
      prev[editingIndex].email = formData["2"];
      prev[editingIndex].role = formData["3"];
      return [...prev];
    });
  };

  const handleOpenAddEmployeeModal = () => {
    addEmployeeModalRef.current?.open();
  };

  const handleOpenEditEmployeeModal = (index: number) => {
    setEditingIndex(index);
    const employee = employeesData[index];
    const initialData = {
      "0": employee.name.first_name,
      "1": employee.name.last_name,
      "2": employee.email,
      "3": employee.role,
    };
    editEmployeeModalRef.current?.open(initialData);
  };

  const handleOpenDeletionModal = (index: number) => {
    setDeletingIndex(index);
    deletingEmployeeModalRef.current?.open();
  };

  const handleDeletion = () => {
    setEmployeesData((prev) => {
      return prev.filter((_, i) => i !== deletingIndex);
    });
  };

  return (
    <section className="border-4 rounded-4xl border-border-default bg-surface-700">
      <article>
        <Header
          button={
            <Button
              size="medium"
              text="Add"
              onClick={handleOpenAddEmployeeModal}
              className="h-[70%] w-[25%]"
            />
          }
        >
          Employees
        </Header>
      </article>
      <hr />
      <article>
        <Table
          tableName="Employees"
          tableData={employeesData}
          onEditClick={handleOpenEditEmployeeModal}
          onDeleteClick={handleOpenDeletionModal}
        />
      </article>
      <Modal
        heading="Add Employees"
        ref={addEmployeeModalRef}
        config={employeeFormConfig}
        onClick={handleAddingEmployees}
      />
      <Modal
        heading="Edit Employees"
        config={employeeFormConfig}
        ref={editEmployeeModalRef}
        onClick={handleEditingEmployee}
      />
      <ConfirmModal
        ref={deletingEmployeeModalRef}
        onConfirm={handleDeletion}
        heading="Employee"
      />
    </section>
  );
}
