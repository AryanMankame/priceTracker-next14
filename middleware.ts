import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  debug: true,
  publicRoutes: ["/"]
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};