import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = cookies();
    cookieStore.set('refreshToken', '', {
        path: '/',
        maxAge: 0
    });

    return NextResponse.json({ message: "sign out" });

}