import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_PATHS = ["/", "/manage/signin"];

export default async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const accessToken = req.cookies.get("session")?.value;

    const decodedAccessToken = accessToken ? (jwt.decode(accessToken) as { exp: number }) : null;
    const isAuthenticated = decodedAccessToken && decodedAccessToken.exp * 1000 > Date.now();

    // if (!isAuthenticated && !PUBLIC_PATHS.includes(pathname)) {
    //     const redirectUrl = new URL(req.nextUrl.origin);
    //     redirectUrl.pathname = "/manage/signin";
    //     return NextResponse.redirect(redirectUrl);
    // }

    const response = NextResponse.next();
    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|api).*)",
    ],
};