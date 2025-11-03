import { type FormFields } from "../types/utils";

export const userFormConfig: FormFields[] = [
  {label: "First Name", type: "text"},
  {label: "Last Name", type: "text"},
  {label: "Eamail", type: "email"},
  {label: "Role", type: "select", options: ["Admin", "User", "Viewer"]}
];

export const policyFormConfig: FormFields[] = [
  {label: "First Name", type: "text"},
  {label: "Last Name", type: "text"},
  {label: "Plan", type: "text"},
  {label: "Status", type: "select", options: ["Pending", "Active", "Expired"]},
  {label: "Effective Date", type: "text"}
];
