"use client"


import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useRouter } from 'next/navigation';

export default function Motivation() {

    useEffect(() => {

        async function getMotivation() {
            try {
                const res = await api.get('motivation/nextMotivation', {
                    params: {

                    }
                })
            } catch (e: any) {
                console.log("message:", e?.message);
                console.log("status:", e?.response?.status);
                console.log("data:", e?.response?.data);
                console.log("request url:", e?.config?.url);
            }
        }
        getMotivation();
    })


    return (
        <div>

        </div>
    );
}
