import type { Dispatch, SetStateAction } from "react";
import type { Employees, Policies } from "./tables";

export interface AppContextValues {
  employees: Employees[];
  setEmployees: Dispatch<SetStateAction<Employees[]>>;
  policies: Policies[];
  setPolicies: Dispatch<SetStateAction<Policies[]>>;
}