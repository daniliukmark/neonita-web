import { Della_Respira } from "next/font/google";
import HotOffers from "../_components/HotOffers";
import pepsiImage from '@/assets/"Pepsi-Cola" Hanging Blue Neon Logo.jpg';
import Image from "next/image";
import EmailForm from "../_components/emailForm";
import { useTranslation } from "../i18n";

const della_Respira = Della_Respira({ weight: "400", subsets: ["latin"] });
interface HomePageProps {
	params: {
		lang: string;
	};
}

export default async function HomePage({ params: { lang } }: HomePageProps) {
	const { t } = await useTranslation(lang, "email-form", {});
	return (
		<main className="flex flex-col items-center gap-4 pt-16 sm:pt-20 pb-4">
			<HotOffers />

			<div className="mx-auto px-4 w-full lg:max-w-screen-lg 2xl:max-w-screen-xl lg:h-[30rem]">
				<div className="flex gap-8 border-2 bg-stone-900 p-6 rounded-xl h-full">
					<div className="sm:inline-block relative hidden bg-black rounded-lg w-full overflow-hidden">
						<Image
							src={pepsiImage}
							alt="Order a Custom Sign!"
							fill
							className="object-center object-cover"
						/>
					</div>
					<div className="w-full max-w-lg h-full">
						<h1 className="pb-4 font-semibold text-4xl leading-none tracking-tight">
							{t("title")}
						</h1>
						<p className="pb-4 text-muted-foreground text-sm">
							{t("description")}
						</p>
						<div>
							<EmailForm />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
