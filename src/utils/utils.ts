import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function truncateString(inputString: string, maxLength: number): string {
	if (inputString.length <= maxLength) {
		return inputString;
	} else {
		return inputString.substring(0, maxLength) + "...";
	}
}

export function convertToSubcurrency(amount: number, factor = 100) {
	return Math.round(amount * factor);
}
