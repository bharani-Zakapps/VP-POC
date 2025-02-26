import { useState } from "react";
import  useProductList from "../../stores/useProductList";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast"
// import { ToastAction } from "@/components/ui/toast"


const AddProductComp = () =>{
    const { addProduct } = useProductList()
    const[nValue,setNvalue] = useState<string>("")
    const { toast } = useToast()
    
    const addProd = () =>{
        addProduct({
            data:nValue,
            id:Math.floor(Math.random() * 1000)
        }
        )
        setNvalue("")
        toast({
            // variant: "destructive",
            title:"Success",
            description:"Product added successfully",
            duration:2000,
            // action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
    }
return(
    <>
    <div className="flex flex-row justify-center gap-10 p-5">
    <Input type="text" value={nValue} onChange={(e)=> setNvalue(e.target.value)}/>
    <Button variant={"success"} onClick={()=> addProd()} disabled={nValue == ""}>Add</Button>
    </div>
    </>
)
}

export default AddProductComp;