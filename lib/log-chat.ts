import { Redis } from "@upstash/redis";
import { createHash } from "crypto";

const LOG_KEY = "chat-log";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export async function logChatExchange(
  ip: string,
  question: string,
  answer: string
) {
  if (!redis) return;

  try {
    await redis.rpush(
      LOG_KEY,
      JSON.stringify({
        timestamp: new Date().toISOString(),
        visitor: hashIp(ip),
        question,
        answer,
      })
    );
  } catch (err) {
    console.error("Chat log write failed:", err);
  }
}
