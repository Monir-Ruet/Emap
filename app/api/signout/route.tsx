import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
    const callback = req.nextUrl.searchParams.get("callback") || "/";
    let host = `https://${req.headers.get('host')}`;
    const redirectUrl = new URL(callback, host);
    const res = NextResponse.redirect(redirectUrl);

    res.cookies.delete("session");
    res.headers.set("Cache-Control", "no-store");
    return res;
}