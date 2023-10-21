import { serverClient } from "@/app/_trpc/serverClient";

export default async function ShopPage() {
  const a = await serverClient.neonSign.hello();
  return (
    <main className="flex flex-col items-center justify-between p-24">
      shop
      {a.greeting}
    </main>
  );
}
