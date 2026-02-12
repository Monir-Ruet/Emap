import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_PATHS = ["/", "/manage/signin"];

const SECURE_PATHS = [{
    path: "/api/violence",
    method: "POST"
}, {
    path: "/api/violence",
    method: "PUT"
}, {
    path: "/api/violence",
    method: "DELETE"
}];

export default async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const method = req.method;

    const accessToken = req.cookies.get("session")?.value;

    let isAuthenticated = false;

    if (accessToken) {
        try {
            const decoded = jwt.verify(
                accessToken,
                process.env.JWT_SECRET!
            ) as { exp: number };

            isAuthenticated = decoded.exp * 1000 > Date.now();
        } catch {
            isAuthenticated = false;
        }
    }

    const isApiRoute = pathname.startsWith("/api");

    if (isApiRoute) {
        if (SECURE_PATHS.some(p => p.path === pathname && p.method === method) &&
            !isAuthenticated
        ) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        return NextResponse.next();
    }

    if (!isAuthenticated && !PUBLIC_PATHS.includes(pathname)) {
        const redirectUrl = new URL(req.nextUrl.origin);
        redirectUrl.pathname = "/manage/signin";
        return NextResponse.redirect(redirectUrl);
    }

    const response = NextResponse.next();
    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};