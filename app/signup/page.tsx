"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { Langs } from "@/lib/language";
import Link from "next/link";

export default function Login() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [nickName, setNickName] = useState("");
    const [language, setLanguage] = useState("");
    const router = useRouter();

    async function signUp(id: string, pw: string, nick: string, lang: string) {
        try {
            const res = await axios.post("/api/auth/signUp/", {
                userId: id,
                password: pw,
                nickName: nick,
                language: lang
            })
            const { accessToken } = res.data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("language", language);

            router.push('/motivation');
        } catch (e: any) {
            console.log("message:", e?.message);
        }

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 font-sans">
            {/* 회원가입 카드 */}
            <div className="w-full max-w-md bg-white rounded-4xl shadow-xl shadow-slate-200/60 p-10 border border-slate-100">

                {/* 상단 타이틀 */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Create Account</h1>
                    <p className="text-slate-400 text-sm">Start your own motivational app</p>
                </div>

                <div className="flex flex-col gap-5">

                    {/* ID 입력창 */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">ID</label>
                        <input
                            name="ID"
                            placeholder="Please enter your ID"
                            className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-base"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div>

                    {/* Password 입력창 */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            name="PW"
                            placeholder="Please set a password"
                            className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-base"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                        />
                    </div>

                    {/* Nickname 입력창 */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">Nickname</label>
                        <input
                            name="nickName"
                            placeholder="Please enter your nickname"
                            className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-base"
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)}
                        />
                    </div>

                    {/* Language 선택창 */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">Language</label>
                        <select
                            className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-base appearance-none cursor-pointer"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option value="" disabled>Please select a language</option>
                            {Langs.map((lang) => (
                                <option key={lang.value} value={lang.value}>
                                    {lang.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 회원가입 버튼 */}
                    <button
                        onClick={() => signUp(id, pw, nickName, language)}
                        className="w-full mt-4 py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-2xl transition-all font-bold text-lg shadow-lg shadow-indigo-100"
                    >
                        Sign Up
                    </button>
                </div>

                {/* 로그인으로 돌아가기 */}
                <div className="mt-8 text-center text-sm text-slate-400">
                    Do you already have an account?
                    <Link href="/login">
                        <span className="ml-2 text-indigo-600 font-semibold hover:underline">
                            Login
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
