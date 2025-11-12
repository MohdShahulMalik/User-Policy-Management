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
import type { Policies } from "../types/tables";

export default function Policies() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const [policiesData, setPoliciesData] = useState<Policies[]>([
    {
      id: { tb: "policies", id: { String: "c1b2a3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d" } },
      name: { first_name: "John", last_name: "Doe" },
      plan: "Premium Health",
      status: "Active",
      effective_date: "2025-01-15",
      employeeId: { tb: "employees", id: { String: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d" } },
    },
    {
      id: { tb: "policies", id: { String: "d2c3b4a5-f6e7-4b8c-9d0a-1f2a3b4c5d6e" } },
      name: { first_name: "Jane", last_name: "Smith" },
      plan: "Basic Dental",
      status: "Active",
      effective_date: "2024-11-20",
      employeeId: { tb: "employees", id: { String: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e" } },
    },
    {
      id: { tb: "policies", id: { String: "e3d4c5b6-a7f8-4c9d-0a1b-2f3a4b5c6d7e" } },
      name: { first_name: "Peter", last_name: "Jones" },
      plan: "Vision Care",
      status: "Expired",
      effective_date: "2023-05-10",
      employeeId: { tb: "employees", id: { String: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f" } },
    },
    {
      id: { tb: "policies", id: { String: "f4e5d6c7-b8a9-4d0a-1b2c-3f4a5b6c7d8e" } },
      name: { first_name: "Susan", last_name: "Williams" },
      plan: "Premium Health",
      status: "Pending",
      effective_date: "2025-03-01",
      employeeId: { tb: "employees", id: { String: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a" } },
    },
    {
      id: { tb: "policies", id: { String: "f47ac10b-58cc-4372-a567-0e02b2c3d479" } },
      name: { first_name: "Michael", last_name: "Davis" },
      plan: "Vision Care",
      status: "Active",
      effective_date: "2024-09-01",
      employeeId: { tb: "employees", id: { String: "a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d" } },
    },
    {
      id: { tb: "policies", id: { String: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d" } },
      name: { first_name: "Jennifer", last_name: "Garcia" },
      plan: "Basic Dental",
      status: "Pending",
      effective_date: "2025-04-10",
      employeeId: { tb: "employees", id: { String: "b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e" } },
    },
    {
      id: { tb: "policies", id: { String: "3d9b7a4c-2e8f-4b1c-9d0a-5e6f7a8b9c0d" } },
      name: { first_name: "William", last_name: "Rodriguez" },
      plan: "Premium Health",
      status: "Active",
      effective_date: "2023-12-25",
      employeeId: { tb: "employees", id: { String: "c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f" } },
    },
    {
      id: { tb: "policies", id: { String: "9e8f7a6b-5c4d-4a3b-b2a1-0c9d8e7f6a5b" } },
      name: { first_name: "Linda", last_name: "Martinez" },
      plan: "Vision Care",
      status: "Expired",
      effective_date: "2022-08-14",
      employeeId: { tb: "employees", id: { String: "d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a" } },
    },
    {
      id: { tb: "policies", id: { String: "8d7c6b5a-4f3e-4d2c-b1a0-9e8f7a6b5c4d" } },
      name: { first_name: "Richard", last_name: "Hernandez" },
      plan: "Basic Dental",
      status: "Active",
      effective_date: "2024-07-19",
      employeeId: { tb: "employees", id: { String: "e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b" } },
    },
    {
      id: { tb: "policies", id: { String: "7c6b5a4d-3e2f-4c1b-a09e-8f7a6b5c4d3e" } },
      name: { first_name: "Karen", last_name: "Lopez" },
      plan: "Premium Health",
      status: "Pending",
      effective_date: "2025-05-20",
      employeeId: { tb: "employees", id: { String: "f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c" } },
    },
    {
      id: { tb: "policies", id: { String: "6b5a4d3e-2f1c-4b0a-9e8f-7a6b5c4d3e2f" } },
      name: { first_name: "Joseph", last_name: "Gonzalez" },
      plan: "Vision Care",
      status: "Active",
      effective_date: "2024-10-30",
      employeeId: { tb: "employees", id: { String: "a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d" } },
    },
    {
      id: { tb: "policies", id: { String: "5a4d3e2f-1c0b-4a99-8f7a-6b5c4d3e2f1c" } },
      name: { first_name: "Jessica", last_name: "Perez" },
      plan: "Basic Dental",
      status: "Expired",
      effective_date: "2023-01-01",
      employeeId: { tb: "employees", id: { String: "b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e" } },
    },
  ]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const addPolicyModalRef = useRef<ModalHandle>(null);
  const editPolicyModalRef = useRef<ModalHandle>(null);
  const deletingPolicyModalRef = useRef<ConfirmModalHandle>(null);

  const handleAddingPolicies = (formData: Record<string, string>) => {
    const newRecord: Policies = {
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
      plan: formData["2"],
      employeeId: { tb: "employees", id: { String: formData["3"] } }, // Dummy employeeId
      status: formData["4"],
      effective_date: formData["5"],
    };
    setPoliciesData((prev) => [...prev, newRecord]);
  };

  const handleEditingPolicy = (formData: Record<string, string>) => {
    if (editingIndex === null) return;

    setPoliciesData((prev) => {
      prev[editingIndex].name = {
        first_name: formData["0"],
        last_name: formData["1"],
      };
      prev[editingIndex].plan = formData["2"];
      prev[editingIndex].status = formData["3"];
      prev[editingIndex].effective_date = formData["4"];
      return [...prev];
    });
  };

  const handleOpenAddPolicyModal = () => {
    addPolicyModalRef.current?.open();
  };

  const handleOpenEditPolicyModal = (index: number) => {
    setEditingIndex(index);
    const policy = policiesData[index];
    const initialData = {
      "0": policy.name.first_name,
      "1": policy.name.last_name,
      "2": policy.plan,
      "3": policy.status,
      "4": policy.effective_date,
    };
    editPolicyModalRef.current?.open(initialData);
  };

  const handleOpenDeletionModal = (index: number) => {
    setDeletingIndex(index);
    deletingPolicyModalRef.current?.open();
  };

  const handleDeletion = () => {
    setPoliciesData((prev) => {
      return prev.filter((_, i) => i !== deletingIndex);
    });
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
