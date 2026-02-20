"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import Link from "next/link";

export default function Login() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const router = useRouter();

    async function login(id: string, pw: string) {
        try {
            const res = await axios.post("/api/auth/login/", {
                userId: id,
                password: pw
            })

            const { user, accessToken } = res.data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("language", user.language);
            localStorage.setItem("lastMotivationId", user.lastMotivationId);
            localStorage.setItem('favoriteMotivationIds', user.favoriteMotivationIds);

            router.push('/motivation');
        } catch (e: any) {
            console.log("message:", e?.message);
        }

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 font-sans">
            {/* 로그인 카드 */}
            <div className="w-full max-w-sm bg-white rounded-4xl shadow-xl shadow-slate-200/60 p-10 border border-slate-100">

                {/* 상단 타이틀 */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome</h1>
                    <p className="text-slate-400 text-sm">Login and confirm the phrase</p>
                </div>

                <div className="flex flex-col gap-5">
                    {/* ID 입력창 */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">
                            ID
                        </label>
                        <input
                            name="ID"
                            placeholder="Please enter your ID"
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-base"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div>

                    {/* PW 입력창 */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">
                            Password
                        </label>
                        <input
                            type="password"
                            name="PW"
                            placeholder="Please enter your password"
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-base"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                        />
                    </div>

                    {/* 로그인 버튼 */}
                    <button
                        onClick={() => login(id, pw)}
                        className="w-full mt-4 py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-2xl transition-all font-bold text-lg shadow-lg shadow-indigo-100"
                    >
                        Login
                    </button>
                </div>

                {/* 하단 보조 링크 (옵션) */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-400">
                        Don't you have an account?
                        <Link href="/signup">
                            <span className="text-indigo-600 font-semibold cursor-pointer hover:underline"> Sign Up</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
