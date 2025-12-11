import { useSearchParams } from "react-router-dom";
import { useRef, useState, type ChangeEvent } from "react";
import Modal, {
  type ModalHandle,
  ConfirmModal,
  type ConfirmModalHandle,
} from "../components/Modal";
import Button from "../components/Button";
import { policyFormConfig } from "../utils/formConfig";
import Header from "../components/Header";
import Table from "../components/Table";
import { v4 as uuidv4 } from "uuid";
import type { Employees, Policies as PoliciesType } from "../types/tables";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addPolicy, updatePolicy, deletePolicy } from "../store/policiesSlice";

export default function Policies() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const dispatch = useAppDispatch();
  const policiesData = useAppSelector((state) => state.policies.data);
  const employeesData = useAppSelector((state) => state.employees.data);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const addPolicyModalRef = useRef<ModalHandle>(null);
  const editPolicyModalRef = useRef<ModalHandle>(null);
  const deletingPolicyModalRef = useRef<ConfirmModalHandle>(null);

  const handleAddingPolicies = (formData: Record<string, string>) => {
    const first_name = formData["0"].split(" ")[0];
    const last_name = formData["0"].split(" ")[1];
    const employee = employeesData.find((e: Employees) => {
      const name = e.name.first_name + e.name.last_name;
      return name === (first_name + last_name);
    });

    if(!employee){
      console.log("Error, no employee found");
      return;
    }

    const employeeId = employee.id;
    const newRecord: PoliciesType = {
      id: {
        tb: "policies",
        id: {
          String: uuidv4(),
        },
      },
      employeeId,
      name: {
        first_name,
        last_name,
      },
      plan: formData["1"],
      status: formData["2"],
      effective_date: formData["3"],
    };
    dispatch(addPolicy(newRecord));
  };

  const handleEditingPolicy = (formData: Record<string, string>) => {
    if (editingId === null) return;

    const index = policiesData.findIndex((p) => p.id.id.String === editingId);
    if (index === -1) return;

    const updatedPolicy: PoliciesType = {
      ...policiesData[index],
      name: {
        first_name: formData["0"],
        last_name: formData["1"],
      },
      plan: formData["3"],
      status: formData["4"],
      effective_date: formData["5"],
    };
    dispatch(updatePolicy({ index, policy: updatedPolicy }));
  };

  const handleOpenAddPolicyModal = () => {
    addPolicyModalRef.current?.open();
  };

  const handleOpenEditPolicyModal = (id: string) => {
    setEditingId(id);
    const policy = policiesData.find((p) => p.id.id.String === id);
    if (!policy) return;

    const initialData = {
      "0": policy.name.first_name + " " + policy.name.last_name,
      "1": policy.plan,
      "2": policy.status,
      "3": policy.effective_date,
    };
    editPolicyModalRef.current?.open(initialData);
  };

  const handleOpenDeletionModal = (id: string) => {
    setDeletingId(id);
    deletingPolicyModalRef.current?.open();
  };

  const handleDeletion = () => {
    if (deletingId !== null) {
      const index = policiesData.findIndex((p) => p.id.id.String === deletingId);
      if (index !== -1) {
        dispatch(deletePolicy(index));
      }
    }
  };

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onStatusFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const filteredPoliciesData = policiesData.filter((policy) => {
    const searchMatch =
      searchTerm === "" ||
      `${policy.name.first_name} ${policy.name.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      policy.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.status.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch = statusFilter === "" || policy.status === statusFilter;

    const userMatch = !userId || policy.employeeId.id.String === userId;

    return searchMatch && statusMatch && userMatch;
  });

  return (
    <section className="overflow-hidden rounded-4xl border-4 border-border-default bg-surface-700">
      <article>
        <Header
          subject="Policy"
          onChange={onSearchInputChange}
          button={
            <Button
              size="medium"
              text="Add"
              onClick={handleOpenAddPolicyModal}
              className="h-[70%] w-[25%]"
            />
          }
          dropdownOptions={["Active", "Pending", "Expired"]}
          dropdownValue={statusFilter}
          onDropdownChange={onStatusFilterChange}
          dropdownPlaceholder="Filter by Status"
        >
          Policies
        </Header>
      </article>
      <hr />
      <article>
        <Table
          tableName="Policies"
          tableData={filteredPoliciesData}
          onEditClick={handleOpenEditPolicyModal}
          onDeleteClick={handleOpenDeletionModal}
        />
      </article>
      <Modal
        heading="Add Policies"
        ref={addPolicyModalRef}
        config={policyFormConfig}
        onClick={handleAddingPolicies}
        employees={employeesData}
      />
      <Modal
        heading="Edit Policies"
        config={policyFormConfig}
        ref={editPolicyModalRef}
        onClick={handleEditingPolicy}
      />
      <ConfirmModal
        ref={deletingPolicyModalRef}
        onConfirm={handleDeletion}
        heading="Policy"
      />
    </section>
  );
}
