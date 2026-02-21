// lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
});

export async function rateLimit(identifier: string) {
  const { success, limit, reset, remaining } =
    await ratelimit.limit(identifier);

  if (!success) {
    return {
      success: false,
      response: new NextResponse("Rate limit exceeded", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      }),
    };
  }

  return { success: true };
}
