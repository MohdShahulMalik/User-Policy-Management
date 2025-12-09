import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Employees } from '../types/tables';
import { initialEmployeesData } from '../data/mockData';

interface EmployeesState {
  data: Employees[];
}

const initialState: EmployeesState = {
  data: initialEmployeesData,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employees[]>) => {
      state.data = action.payload;
    },
    addEmployee: (state, action: PayloadAction<Employees>) => {
      state.data.push(action.payload);
    },
    updateEmployee: (state, action: PayloadAction<{ index: number; employee: Employees }>) => {
      state.data[action.payload.index] = action.payload.employee;
    },
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((_, i) => i !== action.payload);
    },
  },
});

export const { setEmployees, addEmployee, updateEmployee, deleteEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
