import { CultureSection } from "./CultureSection";
import { KitchenSection } from "./KitchenSection";

/** Two feature bands: the kitchen, then the culture of Sanur. */
export function DiningCultureSection() {
  return (
    <>
      <KitchenSection />
      <CultureSection />
    </>
  );
}
