import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const body = await request.json();

    try {
        const res = await axios.post(
            process.env.NEXT_PUBLIC_BASE_URL + "users/login",
            body
        );

        const { user, token } = res.data;
        const cookieStore = cookies();
        cookieStore.set('refreshToken', token.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 36000 // 10시간
        });

        return NextResponse.json({ user, accessToken: token.access })

    } catch (e) {
        return NextResponse.json({ message: "Login failed" }, { status: 401 });
    }
}