import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    console.log('=== MIDDLEWARE ===', request.nextUrl.pathname)
    
    const accessToken = request.cookies.get('accessToken')?.value
    console.log('accessToken:', accessToken ? 'EXISTS' : 'MISSING')

    if (accessToken) {
        if (request.nextUrl.pathname === '/auth/login') {
            return NextResponse.redirect(new URL('/my/profile', request.url))
        }
        return NextResponse.next()
    }

    const refreshToken = request.cookies.get('refreshToken')?.value
    console.log('refreshToken:', refreshToken ? 'EXISTS' : 'MISSING')

    if (!refreshToken) {
        console.log('-> redirecting: no refresh token')
        if (request.nextUrl.pathname === '/auth/register' || request.nextUrl.pathname === '/auth/login') {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `refreshToken=${refreshToken}`
        }
    })

    console.log('refresh response status:', response.status)
    console.log('refresh response cookies:', response.headers.getSetCookie())

    if (response.ok) {
        const nextResponse = NextResponse.next()
        const setCookies = response.headers.getSetCookie()
        setCookies.forEach(cookie => {
            nextResponse.headers.append('Set-Cookie', cookie)
        })
        return nextResponse
    }

    console.log('-> redirecting: refresh failed')
    return NextResponse.redirect(new URL('/auth/login', request.url))
}

export const config = {
    matcher: ['/my/:path*', '/auth/:path*'],
}