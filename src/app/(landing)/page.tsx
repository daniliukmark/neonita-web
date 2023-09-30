import { serverClient } from "@/app/_trpc/serverClient";
import { Separator } from "../_components/ui/separator";
export const dynamic = "force-dynamic";
import { Della_Respira } from "next/font/google";
import { useState } from "react";
import { X } from "lucide-react";
import TopPromoBanner from "../_components/TopPromoBanner";
import ProductCard from "../_components/ProductCard";
import HotOffers from "../_components/HotOffers";

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
      <HotOffers />
      {/* Other produts Compilation or Companies we worked with */}
      {/* Statistics DotGothic16 */}
      {/* Guarantees */}
      <div className="h-screen"></div>
    </main>
  );
}
