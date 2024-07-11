import { type NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLang, languages, cookieName } from "@/app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lang*'
  matcher: [
    "/((?!api/trpc/|_next/static|_next/image|assets|favicon.ico|sw.js|product_images/).*)",
  ],
};

export function middleware(req: NextRequest) {
  let lang;
  if (req.cookies.has(cookieName)) {
    const langCookie = req.cookies.get(cookieName);
    lang = acceptLanguage.get(langCookie?.value);
  }
  if (!lang) lang = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lang) lang = fallbackLang;

  // Redirect if lang in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lang}${req.nextUrl.pathname}`, req.url)
    );
  }

  if (req.headers.has("referer")) {
    const referer = req.headers.get("referer") ?? "";
    const refererUrl = new URL(referer);
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
