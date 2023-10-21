import { Della_Respira } from "next/font/google";
import TopPromoBanner from "../_components/TopPromoBanner";
import HotOffers from "../_components/HotOffers";

const della_Respira = Della_Respira({ weight: "400", subsets: ["latin"] });
export default async function Home() {
  return (
    <main className="flex flex-col items-center pt-16 pb-4 sm:pt-20">
      <TopPromoBanner>
        <span className="py-4 text-lg font-normal text-center ">
          <span>
            🎃Helloween is approaching! Get your neon sign 50% off.🎃{" "}
            <br className="sm:hidden" />
            PROMOCODE:{" "}
          </span>
          <span className={`${della_Respira.className} font-bold`}>
            NEONWEEN
          </span>
        </span>
      </TopPromoBanner>
      <HotOffers />
      {/* Other produts Compilation or Companies we worked with */}
      {/* Statistics DotGothic16 */}
      {/* Guarantees */}
    </main>
  );
}
