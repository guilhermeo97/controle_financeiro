import { CardCount } from "@/components/cards/CardCounts";
import { NewItem } from "@/components/forms/inputs/NewItem";
import { FormProvider } from "@/contexts/FormProvider";
import { DataBase } from "@/data/DataBase";

export default function Home() {
  return (
    <FormProvider initialValue={DataBase} >
      <NewItem/>
      <CardCount/>
    </FormProvider>
  );
}
