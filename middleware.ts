// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

export const config = {
  matcher: [
    // Protect all routes except static files and public ones
    "/((?!_next|.*\\..*|favicon.ico).*)",
    "/(api|trpc)(.*)"
  ],
};
