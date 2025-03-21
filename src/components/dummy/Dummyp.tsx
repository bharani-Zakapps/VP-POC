import { useState } from "react";
import Dummyc from "./Dummyc";

const Dummyp = () =>{
    const [data,setData] = useState('')

    const updateData = (value:any)=>{
        setData(value)
    }
    return(
        <>
        <p>Parent - {data}</p>
        <Dummyc data={data} changeData={(e:any)=>updateData(e)}/>
        </>
    )
}

export default Dummyp;