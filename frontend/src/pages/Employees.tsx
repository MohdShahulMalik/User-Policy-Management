import { useContext, useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
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
import type { Employees as EmployeeInfo } from "../types/tables";
import { AppContext } from "../App";

export default function Employees() {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useContext must be used within an AppContext.Provider");
  }

  const { employees, setEmployees } = context;

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const addEmployeeModalRef = useRef<ModalHandle>(null);
  const editEmployeeModalRef = useRef<ModalHandle>(null);
  const deletingEmployeeModalRef = useRef<ConfirmModalHandle>(null);

  const handleAddingEmployees = (formData: Record<string, string>) => {
    const newRecord: EmployeeInfo = {
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
    setEmployees((prev) => [...prev, newRecord]);
  };

  const handleEditingEmployee = (formData: Record<string, string>) => {
    if (editingIndex === null) return;

    setEmployees((prev) => {
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
    const employee = employees[index];
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
    setEmployees((prev) => {
      return prev.filter((_, i) => i !== deletingIndex);
    });
  };

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onRoleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
  };

  const handleViewPolicies = (index: number) => {
    const employee = employees[index];
    navigate(`/policy-search?userId=${employee.id.id.String}`);
  };

  const filteredEmployeesData = employees.filter((employee) => {
    const searchMatch =
      searchTerm === "" ||
      `${employee.name.first_name} ${employee.name.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());

    const roleMatch = roleFilter === "" || employee.role === roleFilter;

    return searchMatch && roleMatch;
  });

  return (
    <section className="overflow-hidden rounded-4xl border-4 border-border-default bg-surface-700">
      <article>
        <Header
          subject="Employee"
          onChange={onSearchInputChange}
          button={
            <Button
              size="medium"
              text="Add"
              onClick={handleOpenAddEmployeeModal}
              className="h-[70%] w-[25%]"
            />
          }
          dropdownOptions={["Admin", "User", "Viewer"]}
          dropdownValue={roleFilter}
          onDropdownChange={onRoleFilterChange}
          dropdownPlaceholder="Filter by Role"
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
          onViewPoliciesClick={handleViewPolicies}
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