import { serverClient } from "@/app/_trpc/serverClient";
import Image from "next/image";
import { AspectRatio } from "@/app/_components/ui/aspect-ratio";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import AddToCartButton from "@/app/_components/addToCartButton";

const MainImage = ({ neonSign }: { neonSign: any }) => {
  return (
    <div className="absolute overflow-hidden rounded-lg inset-4">
      <div className="absolute w-full h-full -left-1/2">
        <AspectRatio
          className="opacity-70 mix-blend-lighten blur-xl"
          ratio={1 / 2}
        >
          <Image
            src={neonSign != null ? neonSign.image : ""}
            sizes="(max-width: 768px) 1vw, (max-width: 1200px) 1vw, 1vw"
            alt="Blured product photo"
            fill
            unoptimized
            placeholder="blur"
            blurDataURL={neonSign != null ? neonSign.image : ""}
            quality={1}
          />
        </AspectRatio>
      </div>
      <div className="absolute w-full h-full -right-1/2">
        <AspectRatio
          className="opacity-70 mix-blend-lighten blur-xl"
          ratio={1 / 2}
        >
          <Image
            src={neonSign != null ? neonSign.image : ""}
            sizes="(max-width: 768px) 1vw, (max-width: 1200px) 1vw, 1vw"
            alt="Blured product photo"
            fill
            unoptimized
            placeholder="blur"
            blurDataURL={neonSign != null ? neonSign.image : ""}
            quality={1}
          />
        </AspectRatio>
      </div>
      <Image
        src={neonSign != null ? neonSign.image : ""}
        alt="Blured product photo"
        unoptimized
        fill
        placeholder="blur"
        blurDataURL={neonSign != null ? neonSign.image : ""}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        className="object-cover h-full max-h-full m-auto mix-blend-normal max-w-max "
      />
    </div>
  );
};

export default async function FAQPage({
  params,
}: {
  params: { productId: string };
}) {
  const neonSign = await serverClient.neonSign.getById({
    itemId: Number(params.productId),
  });

  return (
    <main className="flex flex-col items-center justify-between pt-24 ">
      {neonSign === null ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-col w-full gap-8 px-4 lg:px-0 sm:flex-row lg:max-w-screen-lg 2xl:max-w-screen-xl">
          <div className="flex flex-col basis-3/5">
            <div className="relative w-full mb-4 overflow-hidden border-2 border-solid bg-stone-900 h-96 sm:h-[32rem] rounded-xl p-4">
              <MainImage neonSign={neonSign} />
            </div>
            <div className="px-4 mb-8 h-fit sm:hidden rounded-xl">
              <div>
                <h1 className="pb-2 text-4xl font-semibold">
                  {neonSign?.name}
                </h1>
                <h2 className="pb-2 text-xl font-light">
                  {`${neonSign?.price.toFixed(2)}$`}
                </h2>
                <p className="pb-8 font-light text-stone-300">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Deserunt vero sunt dolore, vel a assumenda fuga sit inventore
                  voluptate incidunt quaerat. Dolor aut, quasi tempore id qui
                  labore unde rerum!
                </p>
              </div>
              <div className="flex flex-row justify-end gap-4">
                <div className="flex flex-row ">
                  <div className="flex items-center content-center gap-2 align-middle">
                    <div className="inline-block w-2 h-2 bg-green-400 rounded-full" />
                    <span className="inline-block">
                      {neonSign?.inStock == true ? "In Stock" : "On Demand"}
                    </span>
                    {neonSign?.inStock && (
                      <span className="px-2 border-2 border-solid rounded-full bg-stone-900">
                        {neonSign?.quantity}
                      </span>
                    )}
                  </div>
                </div>
                <AddToCartButton
                  itemId={`${neonSign.id}`}
                  price={parseFloat(neonSign.price.toFixed(2))}
                />
              </div>
            </div>
            <div className="w-full p-4 mb-8 text-lg rounded-xl">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it
                    if you prefer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div className="sticky hidden sm:flex p-4 flex-col top-24 basis-2/5 h-[32rem] rounded-xl">
            <div>
              <h1 className="pb-2 text-4xl font-semibold">{neonSign?.name}</h1>
              <h2 className="pb-2 text-xl font-light">
                {`${neonSign?.price.toFixed(2)}$`}
              </h2>
              <p className="pb-12 font-light text-stone-300">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Deserunt vero sunt dolore, vel a assumenda fuga sit inventore
                voluptate incidunt quaerat. Dolor aut, quasi tempore id qui
                labore unde rerum!
              </p>
            </div>
            <div className="flex flex-col items-end gap-4">
              <div className="flex flex-col justify-end gap-4 lg:flex-row">
                <div className="flex flex-row">
                  <div className="flex items-center content-center gap-2 align-middle">
                    <div className="inline-block w-2 h-2 bg-green-400 rounded-full" />
                    <span className="inline-block">
                      {neonSign?.inStock == true ? "In Stock" : "On Demand"}
                    </span>
                    {neonSign?.inStock && (
                      <span className="px-2 border-2 border-solid rounded-full bg-stone-900">
                        {neonSign?.quantity}
                      </span>
                    )}
                  </div>
                </div>
                <AddToCartButton
                  itemId={`${neonSign.id}`}
                  price={parseFloat(neonSign.price.toFixed(2))}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
