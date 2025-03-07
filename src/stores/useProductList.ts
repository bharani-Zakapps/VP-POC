import { create } from "zustand";

interface listData {
  data: string;
  id: number;
}

interface ProductState {
  products: listData[];
  addProduct: (product: listData) => void;
  deleteProduct: (id: number) => void;
}

const useProductList = create<ProductState>((set) => ({
  products: [
    {
      data: "Bharani",
      id: 1,
    },
  ],
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((item: any) => item.id !== id),
    })),
}));

export default useProductList;
