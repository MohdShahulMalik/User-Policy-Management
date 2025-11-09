import { useRef, useState, type ChangeEvent } from "react";
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
      id: { tb: "employees", id: { String: "1" } },
      name: { first_name: "John", last_name: "Doe" },
      email: "john.doe@example.com",
      role: "Admin",
    },
    {
      id: { tb: "employees", id: { String: "2" } },
      name: { first_name: "Jane", last_name: "Smith" },
      email: "jane.smith@example.com",
      role: "User",
    },
    {
      id: { tb: "employees", id: { String: "3" } },
      name: { first_name: "Peter", last_name: "Jones" },
      email: "peter.jones@example.com",
      role: "User",
    },
    {
      id: { tb: "employees", id: { String: "4" } },
      name: { first_name: "Susan", last_name: "Williams" },
      email: "susan.williams@example.com",
      role: "Viewer",
    },
    {
      id: { tb: "employees", id: { String: "5" } },
      name: { first_name: "David", last_name: "Brown" },
      email: "david.brown@example.com",
      role: "User",
    },
    {
      id: { tb: "employees", id: { String: "6" } },
      name: { first_name: "Mary", last_name: "Miller" },
      email: "mary.miller@example.com",
      role: "User",
    },
    {
      id: { tb: "employees", id: { String: "7" } },
      name: { first_name: "Michael", last_name: "Davis" },
      email: "michael.davis@example.com",
      role: "Admin",
    },
    {
      id: { tb: "employees", id: { String: "8" } },
      name: { first_name: "Jennifer", last_name: "Garcia" },
      email: "jennifer.garcia@example.com",
      role: "User",
    },
    {
      id: { tb: "employees", id: { String: "9" } },
      name: { first_name: "William", last_name: "Rodriguez" },
      email: "william.rodriguez@example.com",
      role: "Viewer",
    },
    {
      id: { tb: "employees", id: { String: "10" } },
      name: { first_name: "Linda", last_name: "Martinez" },
      email: "linda.martinez@example.com",
      role: "User",
    },
    {
      id: { tb: "employees", id: { String: "11" } },
      name: { first_name: "Richard", last_name: "Hernandez" },
      email: "richard.hernandez@example.com",
      role: "User",
    },
    {
      id: { tb: "employees", id: { String: "12" } },
      name: { first_name: "Karen", last_name: "Lopez" },
      email: "karen.lopez@example.com",
      role: "Admin",
    },
    {
      id: { tb: "employees", id: { String: "13" } },
      name: { first_name: "Joseph", last_name: "Gonzalez" },
      email: "joseph.gonzalez@example.com",
      role: "User",
    },
    {
      id: { tb: "employees", id: { String: "14" } },
      name: { first_name: "Jessica", last_name: "Perez" },
      email: "jessica.perez@example.com",
      role: "Viewer",
    },
  ]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
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

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  const filteredEmployeesData = employeesData.filter((employee) => {
    if (searchTerm === ""){
      return true;
    }

    const fullName = `${employee.name.first_name} ${employee.name.last_name}`;
    const email = employee.email;

    return fullName.includes(searchTerm) || email.includes(searchTerm)
  })

  return (
    <section className="border-4 rounded-4xl border-border-default bg-surface-700 overflow-hidden">
      <article>
        <Header
          onChange={onSearchInputChange}
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
          tableData={filteredEmployeesData}
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
