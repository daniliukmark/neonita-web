"use client";
import { AspectRatio } from "./ui/aspect-ratio";
import Image, { StaticImageData } from "next/image";
import { cn, truncateString } from "@/utils/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { CssVariable } from "next/dist/compiled/@next/font";

const ProductCard = ({
  imageAspectRatio,
  image,
  className,
  size,
  id,
  title,
  price,
  isLoading = false,
  currency,
  props,
}: {
  imageAspectRatio: number;
  image: StaticImageData | string;
  className?: string | undefined;
  size: "sm" | "lg" | "xl" | "2xl";
  id: string;
  title: string;
  price: number;
  isLoading?: boolean;
  currency: "$" | "€";
  background?: CssVariable;
  props?: any;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      className={cn("relative overflow-hidden w-full h-full", className)}
    >
      <div className="absolute w-full h-full bg-stone-900" />
      <div className="absolute flex flex-col items-stretch justify-between overflow-hidden rounded-lg inset-4 ">
        <div className={cn("relative overflow-hidden flex-grow rounded-lg")}>
          <div className="relative w-full h-full ">
            <div className="absolute w-full max-h-full opacity-50 h-2/4 mix-blend-lighten blur-xl -left-1/2">
              <AspectRatio className="bg-black " ratio={1 / 1}>
                <Image
                  src={image}
                  // sizes="(max-width: 768px) 1vw, (max-width: 1200px) 1vw, 1vw"
                  alt="Blured product photo"
                  fill
                  unoptimized
                  // placeholder="blur"
                  // quality={1}
                />
              </AspectRatio>
            </div>
            <div className="absolute w-full max-h-full opacity-50 h-2/4 mix-blend-lighten blur-xl -right-1/2">
              <AspectRatio className="bg-black" ratio={1 / 1}>
                <Image
                  src={image}
                  alt="Blured product photo"
                  fill
                  unoptimized
                  // sizes="(max-width: 768px) 1vw, (max-width: 1200px) 1vw, 1vw"
                  // placeholder="blur"
                  // quality={1}
                />
              </AspectRatio>
            </div>
            <div className="flex justify-around h-full m-auto">
              <Image
                src={image}
                alt="Blured product photo"
                fill
                unoptimized
                // placeholder="blur"
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                className="object-cover h-full max-h-full m-auto mix-blend-normal max-w-max "
              />
            </div>
          </div>
          <Link className="w-full h-full cursor-pointer" href={"/shop/" + id}>
            <div
              className={cn(
                "absolute inset-0 duration-300 bg-gradient-to-t from-black opacity-0 to-transparent ",
                isHovered && "opacity-40"
              )}
            ></div>
          </Link>
        </div>
        <div
          className={cn(
            "w-full duration-300 basis-1/5 ",
            size === "sm" && "sm:basis-3/12",
            size === "2xl" && "basis-1/5 sm:basis-1/5",
            isHovered && "basis-1/6 sm:basis-2/12"
          )}
        >
          <div
            className={cn(
              "w-full h-full flex flex-row justify-between px-2 pt-2"
            )}
          >
            <div className="h-full">
              <h1
                className={cn(
                  "text-stone-100 font-semibold",
                  size === "sm" && "text-base",
                  size !== "sm" && "text-lg"
                )}
              >
                {truncateString(title, 20)}
              </h1>
              <h2
                className={cn(
                  "text-stone-300",
                  size === "sm" && "text-base",
                  size !== "sm" && "text-sm sm:text-lg "
                )}
              >
                {truncateString(price + currency, 10)}
              </h2>
            </div>

            <Link
              href={"/shop/" + id}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: size === "sm" ? "icon" : "default",
                }),
                size === "2xl" && "w-28 text-sm sm:text-base sm:w-32 "
              )}
            >
              {size === "sm" ? <ChevronRight /> : "View more"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
