"use server";
import Papa from "papaparse";
import { Product } from "@/app/_context/productContext";
import CSV_TABLE from "../../private/csv";

export async function getProducts() {
	const data = Papa.parse<Product>(CSV_TABLE, {
		header: true,
		dynamicTyping: true,
	}).data;

	return data.filter((item) => item.id);
}
