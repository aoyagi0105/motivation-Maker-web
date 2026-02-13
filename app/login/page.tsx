"use client"

import axios from "axios";
import { useState } from "react";
import { baseURL } from "../common/common";

export default function Login() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    async function login(id: string, pw: string) {
        console.log('id:' + id);
        console.log('pw:' + pw);
        try {
            const res = await axios.post(baseURL + "users/login", {
                userId: id,
                password: pw
            });
            localStorage.setItem("accessToken", res.data.token.access)

            console.log('res:' + res.data);
        } catch (e: any) {
            console.log("message:", e?.message);
            console.log("status:", e?.response?.status);
            console.log("data:", e?.response?.data);
            console.log("request url:", e?.config?.url);
        }

    }

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-2 text-xl">
            <div className="flex">
                <p className="w-7">id :</p>
                <input name="ID" className="border mb-1 ml-2" value={id} onChange={e => setId(e.target.value)} />
            </div>
            <div className="flex">
                <p className="w-7">pw: </p>
                <input type="password" name="PW" className="border ml-2 mb-1" value={pw} onChange={e => setPw(e.target.value)} />
            </div>
            <button
                onClick={() => login(id, pw)}
                className="bg-blue-100 rounded-lg px-3 py-1 active:bg-blue-700 border-3 ml-2">
                login
            </button>
        </div>
    );
}
