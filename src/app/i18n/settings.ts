export const fallbackLang = "en";
export const languages = [fallbackLang, "lt"];
export const defaultNS = "translation";
export const cookieName = "i18next";

export function getOptions(lng = fallbackLang, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLang,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
