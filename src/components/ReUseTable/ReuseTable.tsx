import { useState } from "react";
import { Button } from "../ui/button";
// import UserTable1 from "./TableType1";
import ProductTable from "./TableType2";
// import EditableTable from "./controlledTable";
import ParentComponent from "./controlledTable";

const UserTable = () =>{
    const [isFirst,setIsFirst] = useState<boolean>(true)

    return(
        <>
        <Button onClick={()=>setIsFirst(true)}>Table 1</Button>
        <Button onClick={()=>setIsFirst(false)}>Table 2</Button>
        {
            isFirst ? 
            <ParentComponent/>
            :
            <ProductTable/>
        }
        </>
    )
}

export default UserTable;