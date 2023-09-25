import { serverClient } from "@/app/_trpc/serverClient";
import { Separator } from "../_components/ui/separator";
export const dynamic = "force-dynamic";
import { Della_Respira } from "next/font/google";
import { useState } from "react";
import { X } from "lucide-react";
import TopPromoBanner from "../_components/TopPromoBanner";

const della_Respira = Della_Respira({ weight: "400", subsets: ["latin"] });
export default async function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen py-16 sm:py-20">
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
      {/* Top Main Offer Section */}
      <div className="px-4 w-full gap-5 lg:max-w-screen-lg 2xl:max-w-screen-xl flex h-96 lg:h-[32rem] ">
        {/* Core Offer or Most Popular Product */}
        <div className="flex-auto h-full overflow-hidden bg-black border-2 border-solid basis-2/3 rounded-2xl"></div>
        <div className="flex-col flex-auto hidden h-full gap-5 md:flex basis-1/3">
          {/* Compilation of other products*/}
          <div className="overflow-hidden bg-black border-2 border-solid basis-1/2 rounded-2xl"></div>
          <div className="overflow-hidden bg-black border-2 border-solid basis-1/2 rounded-2xl"></div>
        </div>
      </div>
      {/* Other produts Compilation or Companies we worked with */}
      {/* Statistics DotGothic16 */}
      {/* Guarantees */}
      <div className="h-screen"></div>
    </main>
  );
}
