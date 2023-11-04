"use client";
import { useIntersection } from "@mantine/hooks";
import ProductCard from "@/app/_components/ProductCard";
import { trpc } from "@/app/_trpc/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Decimal } from "@prisma/client/runtime/library";
enum SortingOptions {
  NONE,
  ASC,
  DESC,
  NEW,
  TRENDING,
}
const OptionBar = ({
  setSortOptions,
}: {
  setSortOptions: Dispatch<SetStateAction<SortingOptions>>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const value = searchParams.get("sort_by");
    if (value == "trending") setSortOptions(SortingOptions.TRENDING);
    if (value == "new") setSortOptions(SortingOptions.NEW);
    if (value == "price_asc") setSortOptions(SortingOptions.ASC);
    if (value == "price_desc") setSortOptions(SortingOptions.DESC);
    if (value == "none") setSortOptions(SortingOptions.NONE);
  }, []);
  const createQueryString = useCallback(
    (
      name: string,
      value: "trending" | "new" | "price_asc" | "price_desc" | "none"
    ) => {
      if (value == "trending") setSortOptions(SortingOptions.TRENDING);
      if (value == "new") setSortOptions(SortingOptions.NEW);
      if (value == "price_asc") setSortOptions(SortingOptions.ASC);
      if (value == "price_desc") setSortOptions(SortingOptions.DESC);
      if (value == "none") setSortOptions(SortingOptions.NONE);

      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div>
      <h2 className="text-stone-400">Sort by</h2>
      <div className="flex flex-row flex-wrap gap-4 sm:gap-0 sm:flex-col">
        <span
          onClick={() =>
            router.push(
              pathname + "?" + createQueryString("sort_by", "trending")
            )
          }
          className="cursor-pointer text-stone-100 hover:underline"
        >
          Trending
        </span>
        <span
          onClick={() =>
            router.push(pathname + "?" + createQueryString("sort_by", "new"))
          }
          className="cursor-pointer text-stone-100 hover:underline"
        >
          New
        </span>
        <span
          onClick={() =>
            router.push(
              pathname + "?" + createQueryString("sort_by", "price_asc")
            )
          }
          className="cursor-pointer text-stone-100 hover:underline"
        >
          Price: Low to high
        </span>
        <span
          onClick={() =>
            router.push(
              pathname + "?" + createQueryString("sort_by", "price_desc")
            )
          }
          className="cursor-pointer text-stone-100m hover:underline"
        >
          Price: High to low
        </span>
        <span
          onClick={() =>
            router.push(pathname + "?" + createQueryString("sort_by", "none"))
          }
          className="cursor-pointer text-stone-100m hover:underline"
        >
          None
        </span>
      </div>
    </div>
  );
};

function Loading() {
  return <h2>Loading...</h2>;
}

export default function ShopPage() {
  let [sortOptions, setSortOptions] = useState<SortingOptions>(
    SortingOptions.NONE
  );

  const paginationTrigger = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: paginationTrigger.current,
    threshold: 1,
  });
  const { data, hasNextPage, fetchNextPage, isFetching } =
    trpc.neonSign.pagination.useInfiniteQuery(
      { limit: 9 },
      { getNextPageParam: (lastPage) => lastPage.nextCursor, initialCursor: 1 }
    );

  const neonSignItems = data?.pages
    ? data.pages.reduce(
        (accumulator, page) => accumulator.concat(page.items),
        [] as {
          id: number;
          name: string;
          price: Decimal;
          image: string;
          inStock: boolean;
          quantity: number;
        }[]
      )
    : [];
  let sortedNeonSignItems;
  switch (sortOptions) {
    case SortingOptions.ASC:
      sortedNeonSignItems = neonSignItems;
      sortedNeonSignItems.sort((a, b) => Number(a.price) - Number(b.price));
      break;
    case SortingOptions.DESC:
      sortedNeonSignItems = neonSignItems;
      sortedNeonSignItems.sort((a, b) => Number(b.price) - Number(a.price));
      break;
    case SortingOptions.TRENDING:
      sortedNeonSignItems = neonSignItems;
      break;
    case SortingOptions.NEW:
      sortedNeonSignItems = neonSignItems;
      break;
    default:
      sortedNeonSignItems = neonSignItems;
      break;
  }
  if (entry?.isIntersecting && !isFetching && hasNextPage) fetchNextPage();

  return (
    <main className="flex flex-col items-center justify-between px-4 pt-24 sm:px-8">
      <div className="flex flex-col w-full gap-4 lg:flex-row lg:max-w-screen-lg 2xl:max-w-screen-xl ">
        <div className="static mr-auto lg:sticky top-24 lg:basis-48">
          <OptionBar setSortOptions={setSortOptions} />
        </div>
        <div
          className={`flex flex-wrap scroll-smooth flex-1 gap-4 justify-evenly`}
        >
          {!sortedNeonSignItems ? (
            <></>
          ) : (
            sortedNeonSignItems.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex-1 overflow-hidden border-2 border-solid 2xl:flex-grow-1 h-96 bg-stone-950 basis-[21rem] rounded-xl"
                >
                  <ProductCard
                    imageAspectRatio={1 / 1}
                    size="sm"
                    image={item.image}
                    title="Neon Sign Pizza Place place place"
                    price={Number(item.price)}
                    currency="$"
                    id={String(item.id)}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
      {isFetching ? <Loading /> : <div ref={ref}></div>}
    </main>
  );
}
