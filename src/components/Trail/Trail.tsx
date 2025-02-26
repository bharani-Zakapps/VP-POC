import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import TableComp from "./TableComp/TableComp";
import { Button } from "../ui/button";

const fetchDlist = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/albums"
  );
  return data;
};

const Trail = () => {
  const queryClient = useQueryClient();
  const { data, refetch } = useQuery({
    queryKey: ["albumData"],
    queryFn: fetchDlist,
    initialData: []
  });

  const addData = () => {
    // queryClient.setQueryData(["albumData"], (prevData: any) => [
    //   ...prevData,
    //   {
    //     id: 101,
    //     title: "Test Sample",
    //     userId: 1,
    //   },
    // ]);
    queryClient.setQueryData(["albumData"], (prevData: any) => {
     return alterData(prevData)
    });
  };

  const alterData = (value:any) =>{
    return value.map((item:any)=> item.userId === 1 ? {...item,title:"Test Samples"} : item)
  }
  console.log(data, "data");
  return (
    <>
      <Button variant={"danger"} onClick={() => addData()}>Alter</Button>
      <Button variant={"success"} onClick={() => refetch()}>refetch</Button>
      <TableComp />
    </>
  );
};

export default Trail;
