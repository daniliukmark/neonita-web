import { Map, MapPin } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "../i18n";

interface LocationInfoCard {
  title?: string;
  location: string;
  googleMapsUrl: string;
  lang: string;
}
export const LocationInfoCard = async ({
  title,
  location,
  googleMapsUrl,
  lang,
}: LocationInfoCard) => {
  const { t } = await useTranslation(lang, "components", {});

  return (
    <div className="flex flex-col gap-1">
      <span className="self-start text-sm text-stone-300">{title}</span>
      <span className="w-48 gap-1 text-lg ">
        <MapPin className="inline-block w-5 h-5 " />
        <span className="pl-1">{location}</span>
      </span>
      <Link
        href={googleMapsUrl}
        className="pt-2 text-base font-bold text-stone-300"
      >
        <span className="inline-block pr-2 hover:underline">
          {t("loc-info-card.show-on-map")}
        </span>
        <Map className="inline-block" />
      </Link>
    </div>
  );
};
