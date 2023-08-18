export { default } from "next-auth/middleware"

export const config = { matcher: ["/","/products/:path*","/products","/sellers","/sellers/:path*","/categories","/categories/:path*"] }