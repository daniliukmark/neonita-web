import { serverClient } from "@/app/_trpc/serverClient";
import Image from "next/image";
import image from "@/assets/uno.jpeg";

export default async function FAQPage({
  params,
}: {
  params: { productId: string };
}) {
  return (
    <main className="flex flex-col items-center justify-between pt-24">
      <div className="flex flex-col w-full gap-8 px-4 sm:px-0 sm:flex-row max-w-7xl">
        <div className="flex flex-col basis-3/5">
          <div className="relative bg-stone-300 w-full h-[32rem] rounded-xl mb-8">
            <div className="flex justify-around h-full m-auto">
              <Image
                src={image}
                alt="Blured product photo"
                fill
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                className="object-cover h-full max-h-full m-auto mix-blend-normal max-w-max "
              />
            </div>
          </div>
          <div className="block h-[16rem] mb-8 sm:hidden bg-stone-700 rounded-xl"></div>
          <div className="w-full h-[32rem] bg-stone-800 rounded-xl mb-8"></div>
        </div>
        <div className="hidden sm:block basis-2/5 h-[40rem] bg-stone-700 rounded-xl"></div>
      </div>
    </main>
  );
}
