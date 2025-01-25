import { Router, Context, Body } from "../deps.ts";
import { handleError } from '../utils/error.ts'
import { TwitterService , TwitterServiceParams} from "./service.ts";
import dayjs from "npm:dayjs";

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

    /**
     * Possible payload:
     * {
     *   "usernames": ["musk", "trump"],
     *   "keywords": ["usa", "btc"],
     *   "start_date": "2025-01-08T23:31:45Z",
     *   "end_date": "2025-01-24T23:31:45Z"
     *   "limit": 100
     * }
     */
    const params: TwitterSearchParams = await body.json();

    const users = (params.usernames || []).map(u => 'from:' + u)
    const keywords = params.keywords || []
    const dateStart = params.start_date ? dayjs(params.start_date).format("YYYY-MM-DD") : ''
    const dateEnd = params.end_date ? dayjs(params.end_date).format("YYYY-MM-DD") : ''
    const limit = params.limit || 100

    // search query example: (from:elonmusk OR from:realdonaldtrump) (bitcoin OR usa) since:2023-01-01 until:2023-12-31&f=live
    const payload: TwitterServiceParams = {
      searchTerms: [...users, ...keywords],
      start: dateStart,
      end: dateEnd,
      maxItems: limit,
      sort: "Latest",
    };

    console.log('payload', payload);

    const tweets = await TwitterService.search(payload);
    ctx.response.body = tweets;
  } catch (error: unknown) {
    handleError(ctx, error);
  }
})

export { router as twitterRouter };
