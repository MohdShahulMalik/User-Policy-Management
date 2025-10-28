import type { Name, RecordId } from "./utils";

export interface Users {
  name: Name,
  id: RecordId,
  email: string,
  role: string,
}

export interface Policies {
  id: RecordId,
  name: Name,
  plan: string,
  status: string,
  effective_date: string,
}
