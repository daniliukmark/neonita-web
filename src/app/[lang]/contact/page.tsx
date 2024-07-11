import ContactInfoCard from "@/app/_components/ContactInfoCard";
import { LocationInfoCard } from "../../_components/LocationInfoCard";
import { useTranslation } from "@/app/i18n";
const dynamic = "force-dynamic";

interface ContactsPage {
  params: {
    lang: string;
  };
}
export default async function ContactsPage({ params: { lang } }: ContactsPage) {
  const { t } = await useTranslation(lang, "contact-us-page", {});
  return (
    <main className="flex flex-col flex-wrap justify-around gap-16 pt-24 m-auto w-fit sm:flex-row sm:justify-center item lg:gap-64">
      <div>
        <h1 className="pb-4 text-3xl font-semibold text-stone-100">
          {t("contact-info-title")}
        </h1>
        <ContactInfoCard
          title={t("contact-info.sergej-vasiljev.title")}
          name={t("contact-info.sergej-vasiljev.name")}
          email={t("contact-info.sergej-vasiljev.email")}
          phoneNumber={t("contact-info.sergej-vasiljev.phone-number")}
        />
      </div>
      <div>
        <h1 className="pb-4 text-3xl font-semibold text-stone-100">
          {t("locations-title")}
        </h1>
        <LocationInfoCard
          lang={lang}
          title={t("location-info.loc-a.title")}
          location={t("location-info.loc-a.loc")}
          googleMapsUrl={t("location-info.loc-a.googleUrl")}
        />
      </div>
    </main>
  );
}
