import { create } from "zustand";

type IDlist = {
    "userId":number;
    "id":number;
    "title":string;
    "completed":boolean
}


interface ProductState {
    allData: IDlist[];
    addData: (data: IDlist) => void;
    setData:(data:IDlist[]) => void;
    // deleteData : (id:number) => void
  }

  const useDList = create<ProductState>((set)=>({
    allData:[],
    setData:(data) => set({allData :data}),
    addData: (data) =>
        set((state) => ({ allData: [...state.allData, data] })),
  }))

export default useDList;
