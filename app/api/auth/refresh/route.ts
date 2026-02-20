import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refreshToken")?.value;

        if (!refreshToken) {
            return NextResponse.json({ message: "No refresh token" }, { status: 401 })
        }

        const res = await axios.post(
            process.env.NEXT_PUBLIC_BASE_URL + "getAccessToken"
            , null
            , { headers: { authorization: `Bearer ${refreshToken}` } }
        );

        const newAccessToken = res.data.access;

        return NextResponse.json({ accessToken: newAccessToken })
    } catch {
        return NextResponse.json({ message: "Refresh failed" }, { status: 401 });
    }
}