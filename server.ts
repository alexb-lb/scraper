import { Application } from "https://deno.land/x/oak@v17.1.4/mod.ts";
import { twitterRouter } from "./twitter/router.ts";
// import { redditRouter } from "./reddit/router.ts";

const app = new Application();

const PORT = 3000
const HOSTNAME =  "0.0.0.0"

// Use routers
app.use(twitterRouter.routes());
app.use(twitterRouter.allowedMethods());
// app.use(redditRouter.routes());
// app.use(redditRouter.allowedMethods());

// Global error handling
app.addEventListener("error", (evt) => {
  console.error(`Global error: ${evt.error}`);
});

console.log(`Server running on ${HOSTNAME}:${PORT}`);
await app.listen({ hostname: HOSTNAME, port: PORT });


