import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { Icons } from "./Icons";
import { useTranslation } from "../i18n";
const FACEBOOK_URL = "";
const TIKTOK_URL = "";
const YOUTUBE_URL = "";
const INSTAGRAM_URL = "";

interface Footer {
  lang: string;
}

const Footer = async ({ lang }: Footer) => {
  const { t } = await useTranslation(lang, "components");
  return (
    <footer className="relative flex flex-col items-center w-full gap-6 mx-auto my-8 h-fit lg:max-w-5xl">
      <div className="flex justify-center gap-12">
        <Link
          href="/"
          className="text-sm font-normal duration-300 sm:text-base text-stone-500 hover:text-stone-400 hover:underline"
        >
          {t("footer.home-page-link")}
        </Link>
        <Link
          href="/shop"
          className="text-sm font-normal duration-300 sm:text-base text-stone-500 hover:text-stone-400 hover:underline"
        >
          {t("footer.shop-page-link")}
        </Link>
        <Link
          href="/faq"
          className="text-sm font-normal duration-300 sm:text-base text-stone-500 hover:text-stone-400 hover:underline"
        >
          {t("footer.faq-page-link")}
        </Link>
        <Link
          href="/contact"
          className="text-sm font-normal duration-300 sm:text-base text-stone-500 hover:text-stone-400 hover:underline"
        >
          {t("footer.contacts-page-link")}
        </Link>
      </div>
      <div className="flex justify-center gap-8">
        <Link href={FACEBOOK_URL}>
          <Icons.facebook className="w-6 h-6 duration-300 fill-stone-500 hover:fill-stone-400" />
        </Link>
        <Link href={INSTAGRAM_URL}>
          <Icons.instagram className="w-6 h-6 duration-300 fill-stone-500 hover:fill-stone-400" />
        </Link>
        <Link href={TIKTOK_URL}>
          <Icons.tiktok className="w-6 h-6 duration-300 fill-stone-500 hover:fill-stone-400" />
        </Link>
      </div>
      <span className="text-sm font-normal sm:text-base text-stone-500">
        {t("footer.copyright")}
      </span>
    </footer>
  );
};

export default Footer;
