"use server";
import Papa from "papaparse";
import fs from "fs/promises";
import { Product } from "@/app/_context/productContext";

export async function getProducts() {
	const FILE_LOCATION = "private/neonSign_table.csv";
	const fileContent = await fs.readFile(FILE_LOCATION, "utf8");
	const data = Papa.parse<Product>(fileContent, {
		header: true,
		dynamicTyping: true,
	}).data;

	return data.filter((item) => item.id);
}
