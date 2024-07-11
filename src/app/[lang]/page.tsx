import { Della_Respira } from "next/font/google";
import HotOffers from "../_components/HotOffers";

const della_Respira = Della_Respira({ weight: "400", subsets: ["latin"] });
interface HomePageProps {
	params: {
		lang: string;
	};
}

export default async function HomePage({ params: { lang } }: HomePageProps) {
	return (
		<main className="flex flex-col items-center pt-16 sm:pt-20 pb-4">
			{/* <TopPromoBanner>
        <span className="py-4 font-normal text-center text-lg">
          <span>
            🎃Helloween is approaching! Get your neon sign 50% off.🎃{" "}
            <br className="sm:hidden" />
            PROMOCODE:{" "}
          </span>
          <span className={`${della_Respira.className} font-bold`}>
            NEONWEEN
          </span>
        </span>
      </TopPromoBanner> */}
			<HotOffers />
			{/* Other produts Compilation or Companies we worked with */}
			{/* Statistics DotGothic16 */}
			{/* Guarantees */}
		</main>
	);
}
