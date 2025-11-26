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
import { createContext, useMemo, useState } from "react";
import { type Employees as EmployeeInfo, type Policies as PolicyInfo} from "./types/tables";
import type { AppContextValues } from "./types/context";

export const AppContext = createContext<AppContextValues | undefined>(undefined); 
function App() {
  const [employees, setEmployees] = useState<EmployeeInfo[]>(initialEmployeesData);
  const [policies, setPolicies] = useState<PolicyInfo[]>(initialPoliciesData);

  const contextValues = useMemo<AppContextValues>(() => ({
    employees,
    policies,
    setPolicies,
    setEmployees,
  }), [employees, policies])


  return (
    <AppContext.Provider value={contextValues}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route
          path="/employees"
          element={
            <Employees />
          }
        />
        <Route
          path="/policies"
          element={
            <Policies />
          }
        />
          <Route
            path="/policy-search"
            element = {<PolicySearch
            />
          }
          />

      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
    </AppContext.Provider>
  );
}

export default App;
