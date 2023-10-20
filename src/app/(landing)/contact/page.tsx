import ContactInfoCard from "@/app/_components/ContactInfoCard";
import { Separator } from "@/app/_components/ui/separator";
import { serverClient } from "@/app/_trpc/serverClient";
import { LocationInfoCard } from "../../_components/LocationInfoCard";
export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  return (
    <main className="flex flex-col flex-wrap justify-around gap-16 pt-24 m-auto w-fit sm:flex-row sm:justify-center item lg:gap-64">
      <div>
        <h1 className="pb-4 text-3xl font-semibold text-stone-100">
          Contact Us
        </h1>
        <ContactInfoCard
          title="Director"
          name="Sergej Vasiljev"
          email="signs@neonita.com"
          phoneNumber="+370 699 45755"
        />
      </div>
      <div>
        <h1 className="pb-4 text-3xl font-semibold text-stone-100">
          Our Locations
        </h1>
        <LocationInfoCard
          title="Neonita HQ"
          location="P.Vileisio g. &#10; Vilnius, Lithuania"
          googleMapsUrl="https://maps.app.goo.gl/L1WFZtQ4HqoL9FeZ8"
        />
      </div>
    </main>
  );
}
