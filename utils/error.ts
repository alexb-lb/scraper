// Add this to a new file utils/error.ts
import { Context } from "../deps.ts";

export function handleError(ctx: Context, error: unknown) {
  if (error instanceof Error) {
    ctx.throw(500, error.message);
  } else {
    ctx.throw(500, "An unexpected error occurred");
  }
}
