import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || request.nextUrl.origin
    const accessToken = request.cookies.get('accessToken')?.value

    console.log('baseUrl:', baseUrl)
    console.log('env:', process.env.NEXT_PUBLIC_API_URL)
    console.log('origin:', request.nextUrl.origin)


    if (accessToken) {
        const response = await fetch(`${baseUrl}/auth/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `accessToken=${accessToken}`
            }
        })

        if (!response.ok) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }

        if (request.nextUrl.pathname === '/auth/login') {
            return NextResponse.redirect(new URL('/my/profile', request.url))
        }

        return NextResponse.next()
    }

    const refreshToken = request.cookies.get('refreshToken')?.value

    if (!refreshToken) {
        if (request.nextUrl.pathname === '/auth/register' || request.nextUrl.pathname === '/auth/login') {
            return NextResponse.next()
        }

        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const response = await fetch(`${baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `refreshToken=${refreshToken}`
        }
    })

    if (response.ok) {
        const nextResponse = NextResponse.next()
        const setCookies = response.headers.getSetCookie()
        setCookies.forEach(cookie => {
            nextResponse.headers.append('Set-Cookie', cookie)
        })
        return nextResponse
    }

    return NextResponse.redirect(new URL('/auth/login', request.url))
}

export const config = {
    matcher: ['/my/:path*', '/auth/:path*'],
}