import { Della_Respira } from "next/font/google";
import HotOffers from "../_components/HotOffers";
import pepsiImage from '@/assets/"Pepsi-Cola" Hanging Blue Neon Logo.jpg';
import Image from "next/image";
import EmailForm from "../_components/emailForm";

const della_Respira = Della_Respira({ weight: "400", subsets: ["latin"] });
interface HomePageProps {
	params: {
		lang: string;
	};
}

export default async function HomePage({ params: { lang } }: HomePageProps) {
	return (
		<main className="flex flex-col items-center gap-4 pt-16 sm:pt-20 pb-4">
			<HotOffers />

			<div className="mx-auto px-4 w-full lg:max-w-screen-lg 2xl:max-w-screen-xl lg:h-[30rem]">
				<div className="flex gap-8 bg-stone-900 p-6 border rounded-xl h-full">
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
							Make A Neon Sign For You.
						</h1>
						<p className="pb-4 text-muted-foreground text-sm">
							Write a description of a sign you want, click &rdquo;Send&rdquo;.
							Then we will reach out to you, design it and ship it to you.
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
