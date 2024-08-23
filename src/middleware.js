import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value || "";

  console.log(token);
  const decoded = jwt.decode(token);

  if (token) {
    let NEWROLE = decoded.role;
    if (NEWROLE === "Admin") {
      if (path === "/login" || path === "/") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      if (path === "/profile" || path === "/") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }

    if (NEWROLE === "User") {
      if (path === "/admin" || path === "/") {
        return NextResponse.redirect(new URL("/profile", request.url));
      }
      if (path === "/login" || path === "/") {
        return NextResponse.redirect(new URL("/profile", request.url));
      }
    }
  } else {
    if (path !== "/login" && path !== "/verifymail") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile", "/login", "/admin", "/verifymail"],
};
