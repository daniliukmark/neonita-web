import { FC } from "react";
import ProductCard from "./ProductCard";
import { serverClient } from "../_trpc/serverClient";
interface HotOffersProps {}
const productIds = [4, 2, 3];

const HotOffers: FC<HotOffersProps> = async ({}) => {
  const products = await serverClient.neonSign.getMultipleById({
    ids: productIds,
  });

  return (
    <>
      <div className="px-4 w-full gap-5 lg:max-w-screen-lg 2xl:max-w-screen-xl flex sm:h-[40rem] ">
        {/* Core Offer or Most Popular Product */}
        <div className="flex-auto h-full overflow-hidden bg-black border-2 border-solid basis-2/3 rounded-2xl">
          <ProductCard
            imageAspectRatio={1 / 1}
            size="2xl"
            image={"/product_images/" + products[0].image}
            title={products[0].name}
            price={Number(products[0].price)}
            currency="$"
            id={`${products[0].id}`}
            className="block w-full h-96 sm:h-full"
          />
        </div>
        <div className="flex-col flex-auto hidden h-full gap-5 md:flex basis-1/3">
          {/* Compilation of other products*/}
          <div className="overflow-hidden bg-black border-2 border-solid basis-1/2 rounded-2xl">
            <ProductCard
              imageAspectRatio={1 / 1}
              size="sm"
              image={"/product_images/" + products[1].image}
              title={products[1].name}
              price={Number(products[1].price)}
              currency="$"
              id={`${products[1].id}`}
              className="block w-full"
            />
          </div>
          <div className="overflow-hidden bg-black border-2 border-solid basis-1/2 rounded-2xl">
            <ProductCard
              imageAspectRatio={1 / 1}
              size="sm"
              image={"/product_images/" + products[2].image}
              title={products[2].name}
              price={Number(products[2].price)}
              currency="$"
              id={`${products[2].id}`}
            />
          </div>
        </div>
      </div>
      <div className="w-full px-4">
        <div className="mt-4 overflow-hidden border-2 border-solid rounded-2xl sm:hidden">
          <ProductCard
            imageAspectRatio={1 / 1}
            size="2xl"
            image={"/product_images/" + products[1].image}
            title={products[1].name}
            price={Number(products[1].price)}
            currency="$"
            id={`${products[1].id}`}
            className="block w-full h-96"
          />
        </div>
      </div>
      <div className="w-full px-4">
        <div className="mt-4 overflow-hidden border-2 border-solid rounded-2xl sm:hidden">
          <ProductCard
            imageAspectRatio={1 / 1}
            size="2xl"
            image={"/product_images/" + products[2].image}
            title={products[2].name}
            price={Number(products[2].price)}
            currency="$"
            id={`${products[2].id}`}
            className="block w-full h-96"
          />
        </div>
      </div>
    </>
  );
};

export default HotOffers;
