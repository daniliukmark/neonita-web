import ProductCard from "@/app/_components/ProductCard";
import mainImage from "@/assets/uno.jpeg";
import seconadary1Image from "@/assets/flower.jpeg";
import seconadary2Image from "@/assets/atSIgn.jpg";

export default async function ShopPage() {
  return (
    <main className="flex flex-col items-center justify-between px-4 pt-24 sm:px-8">
      <div className="flex flex-col w-full gap-4 sm:flex-row lg:max-w-screen-lg 2xl:max-w-screen-xl ">
        <div className="sticky h-24 top-24 lg:basis-48">fgadsga</div>
        <div className="flex flex-wrap flex-auto gap-4">
          <div className="flex-1 overflow-hidden border-2 border-solid h-96 bg-stone-950 basis-80 rounded-xl">
            <ProductCard
              imageAspectRatio={1 / 1}
              size="sm"
              image={seconadary1Image}
              title="Neon Sign Pizza Place place place"
              price={299.99}
              currency="$"
              id="456426"
            />
          </div>
          <div className="flex-1 overflow-hidden border-2 border-solid h-96 bg-stone-950 basis-80 rounded-xl">
            <ProductCard
              imageAspectRatio={1 / 1}
              size="sm"
              image={seconadary1Image}
              title="Neon Sign Pizza Place place place"
              price={299.99}
              currency="$"
              id="456513"
            />
          </div>{" "}
          <div className="flex-1 overflow-hidden border-2 border-solid h-96 bg-stone-950 basis-80 rounded-xl">
            <ProductCard
              imageAspectRatio={1 / 1}
              size="sm"
              image={seconadary1Image}
              title="Neon Sign Pizza Place place place"
              price={299.99}
              currency="$"
              id="4565315"
            />
          </div>{" "}
          <div className="flex-1 overflow-hidden border-2 border-solid h-96 bg-stone-950 basis-80 rounded-xl">
            <ProductCard
              imageAspectRatio={1 / 1}
              size="sm"
              image={seconadary1Image}
              title="Neon Sign Pizza Place place place"
              price={299.99}
              currency="$"
              id="456531531"
            />
          </div>{" "}
          <div className="flex-1 overflow-hidden border-2 border-solid h-96 bg-stone-950 basis-80 rounded-xl">
            <ProductCard
              imageAspectRatio={1 / 1}
              size="sm"
              image={seconadary1Image}
              title="Neon Sign Pizza Place place place"
              price={299.99}
              currency="$"
              id="45653151"
            />
          </div>{" "}
          <div className="flex-1 overflow-hidden border-2 border-solid h-96 bg-stone-950 basis-80 rounded-xl">
            <ProductCard
              imageAspectRatio={1 / 1}
              size="sm"
              image={seconadary1Image}
              title="Neon Sign Pizza Place place place"
              price={299.99}
              currency="$"
              id="456513"
            />
          </div>{" "}
          <div className="flex-1 overflow-hidden border-2 border-solid h-96 bg-stone-950 basis-80 rounded-xl">
            <ProductCard
              imageAspectRatio={1 / 1}
              size="sm"
              image={seconadary1Image}
              title="Neon Sign Pizza Place place place"
              price={299.99}
              currency="$"
              id="45536"
            />
          </div>{" "}
          <div className="flex-1 overflow-hidden border-2 border-solid h-96 bg-stone-950 basis-80 rounded-xl">
            <ProductCard
              imageAspectRatio={1 / 1}
              size="sm"
              image={seconadary1Image}
              title="Neon Sign Pizza Place place place"
              price={299.99}
              currency="$"
              id="451356"
            />
          </div>{" "}
          <div className="flex-1 overflow-hidden border-2 border-solid h-96 bg-stone-950 basis-80 rounded-xl">
            <ProductCard
              imageAspectRatio={1 / 1}
              size="sm"
              image={seconadary1Image}
              title="Neon Sign Pizza Place place place"
              price={299.99}
              currency="$"
              id="45315651"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
