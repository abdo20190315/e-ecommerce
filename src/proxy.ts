import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ['/cart'];
const authPages = ['/login', '/register'];

export default async function proxy(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

 
  if (protectedPages.includes(pathname)) {
    if (token) {
      return NextResponse.next();
    } else {
      const redirectURL = new URL('/login', process.env.NEXT_URL);
      return NextResponse.redirect(redirectURL);
    }
  }

  if (authPages.includes(pathname)) {
    if (!token) {
      return NextResponse.next();
    } else {
      const redirectURL = new URL('/', process.env.NEXT_URL);
      return NextResponse.redirect(redirectURL);
    }
  }
  return NextResponse.next()
}