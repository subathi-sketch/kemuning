import type { Metadata } from "next";
import { terms } from "@/components/site/data";
import { TermsContent } from "@/components/site/sub/TermsContent";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Sample terms for bookings, cancellations and use of the Kemuning Sanur website.",
};

export default function TermsPage() {
  return <TermsContent title={terms.title} sections={terms.sections} />;
}
