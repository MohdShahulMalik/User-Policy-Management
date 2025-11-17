import type { Employees, Policies } from "../types/tables";

export const initialEmployeesData: Employees[] = [
  {
    id: {
      tb: "employees",
      id: { String: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d" },
    },
    name: { first_name: "John", last_name: "Doe" },
    email: "john.doe@example.com",
    role: "Admin",
  },
  {
    id: {
      tb: "employees",
      id: { String: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e" },
    },
    name: { first_name: "Jane", last_name: "Smith" },
    email: "jane.smith@example.com",
    role: "User",
  },
  {
    id: {
      tb: "employees",
      id: { String: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f" },
    },
    name: { first_name: "Peter", last_name: "Jones" },
    email: "peter.jones@example.com",
    role: "User",
  },
  {
    id: {
      tb: "employees",
      id: { String: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a" },
    },
    name: { first_name: "Susan", last_name: "Williams" },
    email: "susan.williams@example.com",
    role: "Viewer",
  },
  {
    id: {
      tb: "employees",
      id: { String: "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b" },
    },
    name: { first_name: "David", last_name: "Brown" },
    email: "david.brown@example.com",
    role: "User",
  },
  {
    id: {
      tb: "employees",
      id: { String: "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c" },
    },
    name: { first_name: "Mary", last_name: "Miller" },
    email: "mary.miller@example.com",
    role: "User",
  },
  {
    id: {
      tb: "employees",
      id: { String: "a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d" },
    },
    name: { first_name: "Michael", last_name: "Davis" },
    email: "michael.davis@example.com",
    role: "Admin",
  },
  {
    id: {
      tb: "employees",
      id: { String: "b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e" },
    },
    name: { first_name: "Jennifer", last_name: "Garcia" },
    email: "jennifer.garcia@example.com",
    role: "User",
  },
  {
    id: {
      tb: "employees",
      id: { String: "c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f" },
    },
    name: { first_name: "William", last_name: "Rodriguez" },
    email: "william.rodriguez@example.com",
    role: "Viewer",
  },
  {
    id: {
      tb: "employees",
      id: { String: "d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a" },
    },
    name: { first_name: "Linda", last_name: "Martinez" },
    email: "linda.martinez@example.com",
    role: "User",
  },
  {
    id: {
      tb: "employees",
      id: { String: "e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b" },
    },
    name: { first_name: "Richard", last_name: "Hernandez" },
    email: "richard.hernandez@example.com",
    role: "User",
  },
  {
    id: {
      tb: "employees",
      id: { String: "f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c" },
    },
    name: { first_name: "Karen", last_name: "Lopez" },
    email: "karen.lopez@example.com",
    role: "Admin",
  },
  {
    id: {
      tb: "employees",
      id: { String: "a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d" },
    },
    name: { first_name: "Joseph", last_name: "Gonzalez" },
    email: "joseph.gonzalez@example.com",
    role: "User",
  },
  {
    id: {
      tb: "employees",
      id: { String: "b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e" },
    },
    name: { first_name: "Jessica", last_name: "Perez" },
    email: "jessica.perez@example.com",
    role: "Viewer",
  },
];

export const initialPoliciesData: Policies[] = [
  {
    id: {
      tb: "policies",
      id: { String: "c1b2a3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d" },
    },
    name: { first_name: "John", last_name: "Doe" },
    plan: "Premium Health",
    status: "Active",
    effective_date: "2025-01-15",
    employeeId: {
      tb: "employees",
      id: { String: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d" },
    },
  },
  {
    id: {
      tb: "policies",
      id: { String: "d2c3b4a5-f6e7-4b8c-9d0a-1f2a3b4c5d6e" },
    },
    name: { first_name: "Jane", last_name: "Smith" },
    plan: "Basic Dental",
    status: "Active",
    effective_date: "2024-11-20",
    employeeId: {
      tb: "employees",
      id: { String: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e" },
    },
  },
  {
    id: {
      tb: "policies",
      id: { String: "e3d4c5b6-a7f8-4c9d-0a1b-2f3a4b5c6d7e" },
    },
    name: { first_name: "Peter", last_name: "Jones" },
    plan: "Vision Care",
    status: "Expired",
    effective_date: "2023-05-10",
    employeeId: {
      tb: "employees",
      id: { String: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f" },
    },
  },
  {
    id: {
      tb: "policies",
      id: { String: "f4e5d6c7-b8a9-4d0a-1b2c-3f4a5b6c7d8e" },
    },
    name: { first_name: "Susan", last_name: "Williams" },
    plan: "Premium Health",
    status: "Pending",
    effective_date: "2025-03-01",
    employeeId: {
      tb: "employees",
      id: { String: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a" },
    },
  },
  {
    id: {
      tb: "policies",
      id: { String: "f47ac10b-58cc-4372-a567-0e02b2c3d479" },
    },
    name: { first_name: "Michael", last_name: "Davis" },
    plan: "Vision Care",
    status: "Active",
    effective_date: "2024-09-01",
    employeeId: {
      tb: "employees",
      id: { String: "a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d" },
    },
  },
  {
    id: {
      tb: "policies",
      id: { String: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d" },
    },
    name: { first_name: "Jennifer", last_name: "Garcia" },
    plan: "Basic Dental",
    status: "Pending",
    effective_date: "2025-04-10",
    employeeId: {
      tb: "employees",
      id: { String: "b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e" },
    },
  },
  {
    id: {
      tb: "policies",
      id: { String: "3d9b7a4c-2e8f-4b1c-9d0a-5e6f7a8b9c0d" },
    },
    name: { first_name: "William", last_name: "Rodriguez" },
    plan: "Premium Health",
    status: "Active",
    effective_date: "2023-12-25",
    employeeId: {
      tb: "employees",
      id: { String: "c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f" },
    },
  },
  {
    id: {
      tb: "policies",
      id: { String: "9e8f7a6b-5c4d-4a3b-b2a1-0c9d8e7f6a5b" },
    },
    name: { first_name: "Linda", last_name: "Martinez" },
    plan: "Vision Care",
    status: "Expired",
    effective_date: "2022-08-14",
    employeeId: {
      tb: "employees",
      id: { String: "d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a" },
    },
  },
  {
    id: {
      tb: "policies",
      id: { String: "8d7c6b5a-4f3e-4d2c-b1a0-9e8f7a6b5c4d" },
    },
    name: { first_name: "Richard", last_name: "Hernandez" },
    plan: "Basic Dental",
    status: "Active",
    effective_date: "2024-07-19",
    employeeId: {
      tb: "employees",
      id: { String: "e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b" },
    },
  },
  {
    id: {
      tb: "policies",
      id: { String: "7c6b5a4d-3e2f-4c1b-a09e-8f7a6b5c4d3e" },
    },
    name: { first_name: "Karen", last_name: "Lopez" },
    plan: "Premium Health",
    status: "Pending",
    effective_date: "2025-05-20",
    employeeId: {
      tb: "employees",
      id: { String: "f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c" },
    },
  },
  {
    id: {
      tb: "policies",
      id: { String: "6b5a4d3e-2f1c-4b0a-9e8f-7a6b5c4d3e2f" },
    },
    name: { first_name: "Joseph", last_name: "Gonzalez" },
    plan: "Vision Care",
    status: "Active",
    effective_date: "2024-10-30",
    employeeId: {
      tb: "employees",
      id: { String: "a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d" },
    },
  },
  {
    id: {
      tb: "policies",
      id: { String: "5a4d3e2f-1c0b-4a99-8f7a-6b5c4d3e2f1c" },
    },
    name: { first_name: "Jessica", last_name: "Perez" },
    plan: "Basic Dental",
    status: "Expired",
    effective_date: "2023-01-01",
    employeeId: {
      tb: "employees",
      id: { String: "b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e" },
    },
  },
];
