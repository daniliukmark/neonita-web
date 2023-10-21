import Image from "next/image";
import image from "@/assets/uno.jpeg";
import { AspectRatio } from "./ui/aspect-ratio";

export const BgBlurImage = () => {
  return (
    <div className="fixed w-full h-full opacity-30 -z-40">
      <div className="absolute w-full mb-8 sm:w-1/2 max-w-7xl rounded-xl">
        <div className="absolute w-full opacity-70 -z-10 h-2/4 mix-blend-lighten blur-xl -left-1/2">
          <AspectRatio className="bg-black " ratio={1 / 1}>
            <Image
              src={image}
              sizes="(max-width: 768px) 1vw, (max-width: 1200px) 1vw, 1vw"
              alt="Blured product photo"
              fill
              placeholder="blur"
              quality={1}
            />
          </AspectRatio>
        </div>
        <div className="absolute w-full max-h-full opacity-10 -z-10 h-2/4 mix-blend-lighten blur-xl -right-1/2">
          <AspectRatio className="bg-black" ratio={1 / 1}>
            <Image
              src={image}
              alt="Blured product photo"
              fill
              sizes="(max-width: 768px) 1vw, (max-width: 1200px) 1vw, 1vw"
              placeholder="blur"
              quality={1}
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
};
