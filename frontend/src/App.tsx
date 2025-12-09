import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Button from './components/Button'
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Policies from "./pages/Policies";
import {
  initialEmployeesData,
  initialPoliciesData,
} from "./data/mockData";
import PolicySearch from "./pages/PolicySearch";
import { useState } from "react";
import { type Employees as EmployeeInfo, type Policies as PolicyInfo} from "./types/tables";

function App() {
  const [employees, setEmployees] = useState<EmployeeInfo[]>(initialEmployeesData);
  const [policies, setPolicies] = useState<PolicyInfo[]>(initialPoliciesData);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route
          path="/employees"
          element={
            <Employees employeesData={employees} setEmployeesData={setEmployees} />
          }
        />
        <Route
          path="/policies"
          element={
            <Policies
              policiesData={policies}
              setPoliciesData={setPolicies}
              employeesData={employees}
            />
          }
        />
          <Route
            path="/policy-search"
            element = {<PolicySearch
              policiesData={policies}
              setPoliciesData={setPolicies}
              employeesData={employees}
            />
          }
          />

      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
