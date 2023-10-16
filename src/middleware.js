import { NextResponse, NextRequest } from 'next/server';

export async function middleware(NextRequest) {
    const path = NextRequest.nextUrl.pathname;
    const path1 = NextRequest.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/register';
    const isAdminublicPath = path1 === '/admin'

    // Define your admin paths

    const token = NextRequest.cookies.get("token")?.value || '';
    const admintoken=NextRequest.cookies.get("admintoken")?.value||'';

    if(token){
        
    if (isPublicPath && token) {
        // Redirect public paths to user profile if authenticated
        return NextResponse.redirect(new URL('/userprofile', NextRequest.nextUrl));
    }

    if (!isPublicPath && !token) {
        // Redirect protected paths to the login page if not authenticated
        return NextResponse.redirect(new URL('/login', NextRequest.nextUrl));
    }

    }
     if(admintoken){
        if (isAdminublicPath && admintoken) {
            // Redirect public paths to user profile if authenticated
            return NextResponse.redirect(new URL('/admindashboard', NextRequest.nextUrl));
        }
    
        if (!isAdminublicPath && !admintoken) {
            // Redirect protected paths to the login page if not authenticated
            return NextResponse.redirect(new URL('/admin', NextRequest.nextUrl));
        }

    }


}

export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        '/userprofile',
        '/admin',
        '/admindashboard',
        '/catelog',
    ],
};
