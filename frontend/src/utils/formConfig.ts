import { type FormFields } from "../types/utils";

export const employeeFormConfig = [
  {name: "name.first_name", label: "First Name", type: "text"},
  {name: "name.last_name", label: "Last Name", type: "text"},
  {name: "email", label: "Email", type: "email"},
  {name: "role", label: "Role", type: "select", options: ["Admin", "User", "Viewer"]}
];

export const policyFormConfig: FormFields[] = [
  {label: "First Name", type: "text"},
  {label: "Last Name", type: "text"},
  {label: "Plan", type: "text"},
  {label: "Status", type: "select", options: ["Pending", "Active", "Expired"]},
  {label: "Effective Date", type: "text"}
];
