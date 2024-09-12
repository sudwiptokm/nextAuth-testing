import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const authToken = request.cookies.get('admin_auth')?.value;
	if (!authToken && request.nextUrl.pathname === "/about") {
		return NextResponse.redirect(new URL("/", request.url));
	}
	return NextResponse.next();
}

export const config = { matcher: ["/about"] };
