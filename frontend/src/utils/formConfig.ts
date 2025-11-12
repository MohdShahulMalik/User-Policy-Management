import { type FormFields } from "../types/utils";

export const employeeFormConfig: FormFields[] = [
  { name: "name.first_name", label: "First Name", type: "text" },
  { name: "name.last_name", label: "Last Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  {
    name: "role",
    label: "Role",
    type: "select",
    options: ["Admin", "User", "Viewer"],
  },
];

export const policyFormConfig: FormFields[] = [
  { name: "name.first_name", label: "First Name", type: "text" },
  { name: "name.last_name", label: "Last Name", type: "text" },
  { name: "plan", label: "Plan", type: "text" },
  { name: "employee_id", label: "Employee Id", type: "text" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["Pending", "Active", "Expired"],
  },
  { name: "effective_date", label: "Effective Date", type: "date" },
];
