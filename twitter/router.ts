import { Router, Context, Body } from "../deps.ts";
import * as twitterService from "./service.ts";
import { handleError } from '../utils/error.ts'

twitterService

const router = new Router({ prefix: '/twitter' });

interface TwitterSearchParams {
  usernames:   string[]  // Usernames to fetch data from
  keywords:    string[]  // Keywords/hashtags to search for
  start_date?: string    // Start date (ISO format)
  end_date?:   string    // End date (ISO format)
  limit:       number    // Maximum items to return
}

router.post("/search", async (ctx: Context) => {
  try {
    const body: Body = ctx.request.body;

    if (!body.has) {
      ctx.throw(400, `Request body is required`);
      return;
    }

    const params: TwitterSearchParams = await body.json();

    if (!params.usernames?.length || !params.keywords?.length) {
      ctx.throw(400, "usernames and keywords are mandatory params. They must be arrays of string");
      return;
    }
    // const tweets = await twitterService.searchTweets(query);
    // ctx.response.body = tweets;
  } catch (error: unknown) {
    handleError(ctx, error);
  }
})

export { router as twitterRouter };
