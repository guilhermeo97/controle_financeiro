import { CardCount } from "@/components/cards/CardCounts";
import { NewItem } from "@/components/forms/inputs/NewItem";

export default function Home() {
  return (
    <main>
      <NewItem/>
      <CardCount/>
    </main>
  );
}
