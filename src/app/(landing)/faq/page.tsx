import { serverClient } from "@/app/_trpc/serverClient";
export const dynamic = "force-dynamic";

export default async function FAQPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      FAQ
    </main>
  );
}
