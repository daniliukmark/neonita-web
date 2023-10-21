import { FC } from "react";
import ProductCard from "./ProductCard";
import mainImage from "@/assets/uno.jpeg";
import seconadary1Image from "@/assets/flower.jpeg";
import seconadary2Image from "@/assets/atSIgn.jpg";

interface HotOffersProps {}

const HotOffers: FC<HotOffersProps> = ({}) => {
  return (
    <>
      <div className="px-4 w-full gap-5 lg:max-w-screen-lg 2xl:max-w-screen-xl flex sm:h-[40rem] ">
        {/* Core Offer or Most Popular Product */}
        <div className="flex-auto h-full overflow-hidden bg-black border-2 border-solid basis-2/3 rounded-2xl">
          <ProductCard
            imageAspectRatio={1 / 1}
            size="2xl"
            image={mainImage}
            title="Neon Sign Pizza Place"
            price={299.99}
            currency="$"
            id="123"
            className="block w-full h-96 sm:h-full"
          />
        </div>
        <div className="flex-col flex-auto hidden h-full gap-5 md:flex basis-1/3">
          {/* Compilation of other products*/}
          <div className="overflow-hidden bg-black border-2 border-solid basis-1/2 rounded-2xl">
            <ProductCard
              imageAspectRatio={1 / 1}
              size="sm"
              image={seconadary1Image}
              title="Neon Sign Pizza Place place place"
              price={299.99}
              currency="$"
              id="456"
            />
          </div>
          <div className="overflow-hidden bg-black border-2 border-solid basis-1/2 rounded-2xl">
            <ProductCard
              imageAspectRatio={1 / 1}
              size="sm"
              image={seconadary2Image}
              title="Neon Sign Pizza Place"
              price={299.99}
              currency="$"
              id="789"
            />
          </div>
        </div>
      </div>
      <div className="w-full px-4">
        <div className="mt-4 overflow-hidden border-2 border-solid rounded-2xl sm:hidden">
          <ProductCard
            imageAspectRatio={1 / 1}
            size="2xl"
            image={seconadary1Image}
            title="Neon Sign Pizza Place"
            price={299.99}
            currency="$"
            id="789"
            className="block w-full h-96"
          />
        </div>
      </div>
      <div className="w-full px-4">
        <div className="mt-4 overflow-hidden border-2 border-solid rounded-2xl sm:hidden">
          <ProductCard
            imageAspectRatio={1 / 1}
            size="2xl"
            image={seconadary2Image}
            title="Neon Sign Pizza Place"
            price={299.99}
            currency="$"
            id="1243255"
            className="block w-full h-96"
          />
        </div>
      </div>
    </>
  );
};

export default HotOffers;
