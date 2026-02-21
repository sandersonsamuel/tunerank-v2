import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {

    const accessToken = request.cookies.get('accessToken')?.value

    if (accessToken) {
        return NextResponse.next()
    }

    const refreshToken = request.cookies.get('refreshToken')?.value

    if (!refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
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
            const [cookiePair] = cookie.split(';')
            const [name, value] = cookiePair.split('=')
            nextResponse.cookies.set(name, value)
        })
        return nextResponse
    }

    return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
    matcher: ['/my/:path*'],
}