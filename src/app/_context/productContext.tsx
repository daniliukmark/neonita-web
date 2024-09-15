"use client";
import { getProducts } from "@/utils/products";
import { ReactNode, createContext, useEffect, useState } from "react";

export type Product = {
	id: number;
	name: string;
	image: string;
	price: number;
	currency: string;
	quantity: number;
	inStock: boolean;
	size: string | null;
};

export const ProductContext = createContext<{ products: Product[] }>({
	products: [],
});

export default function ProductProvider({ children }: { children: ReactNode }) {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		getProducts().then((data) => setProducts(data));
	}, []);

	return (
		<ProductContext.Provider value={{ products }}>
			{children}
		</ProductContext.Provider>
	);
}
