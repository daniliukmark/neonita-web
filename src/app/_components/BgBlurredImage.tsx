import Image from "next/image";
import image from "@/assets/uno.jpeg";
import { AspectRatio } from "./ui/aspect-ratio";

export const BgBlurImage = ({
	position = "fixed",
}: {
	position: "fixed" | "absolute";
}) => {
	return (
		<div className={"fixed w-full h-full opacity-30 -z-40 inset-0"}>
			<div className="absolute mb-8 rounded-xl w-full sm:w-1/2 max-w-7xl">
				<div className="-left-1/2 -z-10 absolute opacity-70 blur-xl w-full h-2/4 mix-blend-lighten">
					<AspectRatio ratio={1}>
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
				<div className="-right-1/2 -z-10 absolute opacity-10 blur-xl w-full h-2/4 max-h-full mix-blend-lighten">
					<AspectRatio ratio={1}>
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
