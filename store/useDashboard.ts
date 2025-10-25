import { create } from "zustand";

export interface SummaryRes {
  balance: number;
  today: number;
  total: number;
}
export interface DashboardState {
  summary: SummaryRes | null;
  setSummary: (summary: SummaryRes) => void;
}

export const useDashboard = create<DashboardState>((set) => ({
  summary: null,
  setSummary: (summary) => set({ summary }),
}));
