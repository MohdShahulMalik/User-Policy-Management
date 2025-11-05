import type { Name, RecordId } from "./utils";

export interface Users {
  id: RecordId;
  name: Name;
  email: string;
  role: string;
}

export interface Policies {
  id: RecordId;
  name: Name;
  plan: string;
  status: string;
  effective_date: string;
}
