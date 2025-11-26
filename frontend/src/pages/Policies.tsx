import { useSearchParams } from "react-router-dom";
import {
  useRef,
  useState,
  type ChangeEvent,
  useContext,
} from "react";
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
import type { Policies as PolicyInfo } from "../types/tables";
import { AppContext } from "../App";

export default function Policies() {
  const [searchParams] = useSearchParams();
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useContext must be used within an AppContext.Provider");
  }

  const { policies, setPolicies } = context;
  const userId = searchParams.get("userId");

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const addPolicyModalRef = useRef<ModalHandle>(null);
  const editPolicyModalRef = useRef<ModalHandle>(null);
  const deletingPolicyModalRef = useRef<ConfirmModalHandle>(null);

  const handleAddingPolicies = (formData: Record<string, string>) => {
    const newRecord: PolicyInfo = {
      id: {
        tb: "policies",
        id: {
          String: uuidv4(),
        },
      },
      name: {
        first_name: formData["0"],
        last_name: formData["1"],
      },
      employeeId: { tb: "employees", id: { String: formData["2"] } }, // Dummy employeeId
      plan: formData["3"],
      status: formData["4"],
      effective_date: formData["5"],
    };
    setPolicies((prev) => [...prev, newRecord]);
  };

  const handleEditingPolicy = (formData: Record<string, string>) => {
    if (editingIndex === null) return;

    setPolicies((prev) => {
      prev[editingIndex].name = {
        first_name: formData["0"],
        last_name: formData["1"],
      };
      prev[editingIndex].plan = formData["3"];
      prev[editingIndex].status = formData["4"];
      prev[editingIndex].effective_date = formData["5"];
      return [...prev];
    });
  };

  const handleOpenAddPolicyModal = () => {
    addPolicyModalRef.current?.open();
  };

  const handleOpenEditPolicyModal = (index: number) => {
    setEditingIndex(index);
    const policy = policies[index];
    const initialData = {
      "0": policy.name.first_name,
      "1": policy.name.last_name,
      "2": policy.employeeId.id.String,
      "3": policy.plan,
      "4": policy.status,
      "5": policy.effective_date,
    };
    editPolicyModalRef.current?.open(initialData);
  };

  const handleOpenDeletionModal = (index: number) => {
    setDeletingIndex(index);
    deletingPolicyModalRef.current?.open();
  };

  const handleDeletion = () => {
    setPolicies((prev) => {
      return prev.filter((_, i) => i !== deletingIndex);
    });
  };

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onStatusFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const filteredPoliciesData = policies.filter((policy) => {
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