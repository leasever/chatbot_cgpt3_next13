import { NextRequest, NextResponse } from "next/server";
import { ratelimiter } from "./lib/rate-limiter";

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? "127.0.0.1";

  try {
    const { success } = await ratelimiter.limit(ip);

    if (!success) return new NextResponse("You are writing  messages too fast.");
  } catch (error) {
    return new NextResponse('Sorry, something went proccessing your message. Please try again later.')
  }
}

export const config = {
  matcher: "/api/message/:path*",
};
