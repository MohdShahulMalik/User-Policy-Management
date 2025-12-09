import { useSearchParams } from "react-router-dom";
import { useRef, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
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
import type { Employees, Policies } from "../types/tables";
import type { RecordId } from "../types/utils";

interface PoliciesProps {
  policiesData: Policies[];
  setPoliciesData: Dispatch<SetStateAction<Policies[]>>;
  employeesData: Employees[];
}

export default function Policies(props: PoliciesProps) {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const policiesData = props.policiesData;
  const setPoliciesData = props.setPoliciesData;
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const addPolicyModalRef = useRef<ModalHandle>(null);
  const editPolicyModalRef = useRef<ModalHandle>(null);
  const deletingPolicyModalRef = useRef<ConfirmModalHandle>(null);

  const handleAddingPolicies = (formData: Record<string, string>) => {
    const first_name = formData["0"].split(" ")[0];
    const last_name = formData["0"].split(" ")[1];
    const employee = props.employeesData.find((e) => {
      const name = e.name.first_name + e.name.last_name;
      return name === (first_name + last_name);
    });
    const employeeId = employee?.id as RecordId;
    const newRecord: Policies = {
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
    setPoliciesData((prev) => [...prev, newRecord]);
  };

  const handleEditingPolicy = (formData: Record<string, string>) => {
    if (editingIndex === null) return;

    setPoliciesData((prev) => {
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
    const policy = policiesData[index];
    const initialData = {
      "0": policy.name.first_name + " " + policy.name.last_name,
      "1": policy.plan,
      "2": policy.status,
      "3": policy.effective_date,
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
        employees={props.employeesData}
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
