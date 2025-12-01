import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type Policies } from '../types/tables';
import { initialPoliciesData } from '../data/mockData';

interface PoliciesState {
  data: Policies[];
}

const initialState: PoliciesState = {
  data: initialPoliciesData,
};

const policiesSlice = createSlice({
  name: 'policies',
  initialState,
  reducers: {
    setPolicies: (state, action: PayloadAction<Policies[]>) => {
      state.data = action.payload;
    },
    addPolicy: (state, action: PayloadAction<Policies>) => {
      state.data.push(action.payload);
    },
    updatePolicy: (state, action: PayloadAction<{ index: number; policy: Policies }>) => {
      state.data[action.payload.index] = action.payload.policy;
    },
    deletePolicy: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((_, i) => i !== action.payload);
    },
  },
});

export const { setPolicies, addPolicy, updatePolicy, deletePolicy } = policiesSlice.actions;
export default policiesSlice.reducer;
