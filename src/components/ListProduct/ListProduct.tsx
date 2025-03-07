import Tanstacktable from "../TanstackTable/Tanstacktable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const ListProduct = () => {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Show Table</AccordionTrigger>
          <AccordionContent>
            <Tanstacktable />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default ListProduct;
