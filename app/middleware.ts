// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   console.log("Middleware is running");
//   console.log("Request URL:", request.url);
//   const isAuthenticated = false; // This should be replaced with your actual authentication check
//   console.log("isAuthenticated:", isAuthenticated);

//   if (!isAuthenticated) {
//     const url = request.nextUrl.clone();
//     url.pathname = "/signin";
//     console.log("Redirecting to:", url.href);
//     return NextResponse.redirect(url);
//   }
//   console.log("Allowing access to protected route");
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"], // Match all sub-paths of /dashboard
// };
// import { NextRequest, NextResponse } from "next/server";
// // const isAuthenticated = !!sessionStorage.getItem("token");
// export function middleware(request: NextRequest) {
//   console.log("Middleware is running");
//   console.log("Request URL:", request.url);
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

// export function middleware(request: NextRequest) {
//   console.log("Middleware is running");
//   console.log("Request URL:", request.url);

//   // Get cookies from the request
//   const token = false;

//   // Check if token is present
//   if (!token) {
//     // If not authenticated, redirect to login
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // If authenticated, proceed with the request
//   return NextResponse.next();
// }

import { NextResponse } from "next/server";

export default function middleware(req: NextResponse) {
  console.log("run middleware");
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
