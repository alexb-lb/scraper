import { ApifyClient } from "npm:apify-client";

const APIFY_TOKEN = 'apify_api_Mlp7DQLCd0x0KbUutdXNExLtmnFNOj3jHwmY'
const client = new ApifyClient({ token: APIFY_TOKEN });

export interface TwitterServiceParams {
  searchTerms?: string[] // Search terms you want to search from Twitter (X). You can refer to https://github.com/igorbrigadir/twitter-advanced-search.
  includeSearchTerms?: boolean // If selected, a field will be added to each tweets about the search term that was used to find it.
  twitterHandles?: string[]  // Twitter handles that you want to search on Twitter: ["elonmusk", "taylorswift13"]
  conversationIds?: string[] // Conversation IDs that you want to search on Twitter: ["1754067365707563045","1732037140111102460"]
  maxItems?: number // Maximum number of items that you want as output: 1000
  startUrls?: string[] // ["conversation_id:tweet_id_here #hashtag_here"]
  sort?: "Latest" | "Top" // Sorts search results by the given option. Only works with search terms and search URLs.
  tweetLanguage?: string, // Restricts tweets to the given language, given by an ISO 639-1 code: "en"
  onlyVerifiedUsers?: boolean // If selected, only returns tweets by users who are verified.
  onlyTwitterBlue?: boolean // If selected, only returns tweets by users who are Twitter Blue subscribers.
  onlyImage?: boolean // If selected, only returns tweets that contain images.
  onlyVideo?: boolean // If selected, only returns tweets that contain videos.
  onlyQuote?: boolean // If selected, only returns tweets that are quotes.
  author?: string  // Returns tweets sent by the given user. It should be a Twitter (X) Handle.
  inReplyTo?: string // Returns tweets that are replies to the given user. It should be a Twitter (X) Handle: "webexpo",
  mentioning?: string // Returns tweets mentioning the given user. It should be a Twitter (X) Handle: "elonmusk",
  geotaggedNear?: string // Returns tweets sent near the given location: "Los Angeles",
  withinRadius?: string // "15km",
  geocode?: string // Returns tweets sent by users located within a given radius of the given latitude/longitude: "37.7764685,-122.4172004,10km",
  placeObjectId?: string // Returns tweets tagged with the given place: "96683cc9126741d1",
  minimumRetweets?: number // Returns tweets with at least the given number of retweets: 5,
  minimumFavorites?: number // 5,
  minimumReplies?: number // 5,
  start?: string // Returns tweets sent after the given date. "2021-07-01",
  end?: string // Returns tweets sent before the given date. "2021-07-02",
  customMapFunction?: () => unknown
};

export const TwitterService = {
  search: async (params: TwitterServiceParams) => {
    const runProcess = await client.actor("apidojo/tweet-scraper").call(params);
    console.log(`💾 Check your data here: https://console.apify.com/storage/datasets/${runProcess.defaultDatasetId}`);

    const { items } = await client.dataset(runProcess.defaultDatasetId).listItems();
    console.log(items);
    return items
  }
}
