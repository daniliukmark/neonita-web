import "@/app/_styles/globals.css";
import { type ReactNode } from "react";
import Navbar from "@/app/_components/Navbar";
import Footer from "../_components/Footer";
import { BgBlurImage } from "../_components/BgBlurredImage";

interface GeneralLayoutProps {
	children: ReactNode;
	params: {
		lang: string;
	};
}

export default function GeneralLayout({
	children,
	params: { lang },
}: GeneralLayoutProps) {
	return (
		<>
			<div className="top-0 bottom-0 -z-50 fixed bg-gradient-to-b from-black to-stone-900 w-full min-h-screen" />
			<BgBlurImage position="fixed" />
			<div className="flex flex-col justify-between h-full min-h-screen text-white dark">
				<Navbar lang={lang} />
				<main className="relative flex-1">{children}</main>
				<Footer lang={lang} />
			</div>
		</>
	);
}
