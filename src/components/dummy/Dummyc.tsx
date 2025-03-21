import { Input } from "../ui/input";

const Dummyc = ({data,changeData}:any) =>{
    return(
        <>
        <Input type="text" value={data} onChange={(e)=>changeData(e.target.value)} />
        </>
    )
}

export default Dummyc;