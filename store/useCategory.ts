import { create } from "zustand";

export interface CategoryRes {
  categoryName: string;
  totalAmount: string;
  categoryId: string;
}
export interface CategoryState {
  categories: CategoryRes[] | null;
  setCategories: (categories: CategoryRes[]) => void;
}

export const useCategory = create<CategoryState>((set) => ({
  categories: null,
  setCategories: (categories) => set({ categories }),
}));
