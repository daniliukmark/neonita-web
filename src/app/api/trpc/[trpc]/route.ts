import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/api/root";
import { db } from "@/server/db";

function setCorsHeaders(res: Response) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Request-Method", "*");
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.headers.set("Access-Control-Allow-Headers", "*");
}

const handler = (req: Request) => {
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: req,
    router: appRouter,
    createContext: () => ({ db, req }),
    onError({ error, path }) {
      console.error(`>>> tRPC Error on '${path}'`, error);
    },
  });
};

export { handler as GET, handler as POST };
