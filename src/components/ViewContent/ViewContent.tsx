import AddProductComp from "../AddProduct/AddProductComp";
import ListProduct from "../ListProduct/ListProduct";
import UserTable from "../ReUseTable/ReuseTable";
import SortingTable from "../SortingTable/SortingTable";
import DList from "../TableDList/TableDList";
import TableExpand from "../tableExpand/TableExpand";
import Trail from "../Trail/Trail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const ViewContent = () => {
  return (
    <>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="first">Table using Local Data</TabsTrigger>
          <TabsTrigger value="second">Table using React Query</TabsTrigger>
          <TabsTrigger value="third">Table using Expand Collapse</TabsTrigger>
          <TabsTrigger value="four">Table using Sorting</TabsTrigger>
          <TabsTrigger value="five">Trial</TabsTrigger>
          <TabsTrigger value="six">Reuse Table</TabsTrigger>
        </TabsList>
        <TabsContent value="first">
          <AddProductComp />
          <ListProduct />
        </TabsContent>
        <TabsContent value="second">
            <DList/>
        </TabsContent>
        <TabsContent value="third">
          <TableExpand/>
        </TabsContent>
        <TabsContent value="four">
          <SortingTable/>
        </TabsContent>
        <TabsContent value="five">
          <Trail/>
        </TabsContent>
        <TabsContent value="six">
          <UserTable/>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ViewContent;
