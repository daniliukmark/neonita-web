"use client";
import dynamic from "next/dynamic";

const CheckoutForm = dynamic(() => import("@/app/_components/CheckoutForm"), {
  ssr: false,
});
export default function CheckoutPage() {
  return (
    <main className="flex flex-col items-center justify-between w-full px-4 pt-24 lg:px-0">
      <div className="w-full h-full max-w-2xl gap-4">
        <h1 className="pb-2 text-5xl font-semibold">Checkout</h1>
        <CheckoutForm />
      </div>
    </main>
  );
}
