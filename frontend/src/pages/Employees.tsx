import { useRef, useState, type ChangeEvent } from "react";
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
import type { Employees as EmployeesType } from "../types/tables";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addEmployee, updateEmployee, deleteEmployee } from "../store/employeesSlice";

export default function Employees() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const employeesData = useAppSelector((state) => state.employees.data);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const addEmployeeModalRef = useRef<ModalHandle>(null);
  const editEmployeeModalRef = useRef<ModalHandle>(null);
  const deletingEmployeeModalRef = useRef<ConfirmModalHandle>(null);

  const handleAddingEmployees = (formData: Record<string, string>) => {
    const newRecord: EmployeesType = {
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
    dispatch(addEmployee(newRecord));
  };

  const handleEditingEmployee = (formData: Record<string, string>) => {
    if (editingId === null) return;

    const index = employeesData.findIndex((e) => e.id.id.String === editingId);
    if (index === -1) return;

    const updatedEmployee: EmployeesType = {
      ...employeesData[index],
      name: {
        first_name: formData["0"],
        last_name: formData["1"],
      },
      email: formData["2"],
      role: formData["3"],
    };
    dispatch(updateEmployee({ index, employee: updatedEmployee }));
  };

  const handleOpenAddEmployeeModal = () => {
    addEmployeeModalRef.current?.open();
  };

  const handleOpenEditEmployeeModal = (id: string) => {
    setEditingId(id);
    const employee = employeesData.find((e) => e.id.id.String === id);
    if (!employee) return;

    const initialData = {
      "0": employee.name.first_name,
      "1": employee.name.last_name,
      "2": employee.email,
      "3": employee.role,
    };
    editEmployeeModalRef.current?.open(initialData);
  };

  const handleOpenDeletionModal = (id: string) => {
    setDeletingId(id);
    deletingEmployeeModalRef.current?.open();
  };

  const handleDeletion = () => {
    if (deletingId !== null) {
      const index = employeesData.findIndex((e) => e.id.id.String === deletingId);
      if (index !== -1) {
        dispatch(deleteEmployee(index));
      }
    }
  };

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onRoleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
  };

  const handleViewPolicies = (id: string) => {
    navigate(`/policy-search?userId=${id}`);
  };

  const filteredEmployeesData = employeesData.filter((employee) => {
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
