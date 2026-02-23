"use client"

import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Langs } from "@/lib/language";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';

export default function Favorite() {
    const [language, setLanguage] = useState<string>("");
    const [motivationText, setMotivationText] = useState<string | null>('');
    const [motivationAuthor, setMotivationAuthor] = useState<string | null>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFavored, setIsFavored] = useState<boolean>(false);
    const [motiCount, setMotiCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        async function getMotivation() {
            try {
                const savedLang = localStorage.getItem('language');
                if (!savedLang) return;
                if (savedLang) {
                    setLanguage(savedLang);
                }

                const favIdsArray = getFavMotiIds();
                if (!favIdsArray) {
                    setMotivationAuthor('');
                    setMotivationText('There is no favorite motivation.');
                    setIsFavored(false);
                    return;
                }

                const isFav = favIdsArray.includes(favIdsArray[motiCount]);
                setIsFavored(isFav);
                await setMotivation(favIdsArray[motiCount], savedLang);
            } catch (e: any) {
                console.log("message:", e?.message);
            }
        }
        getMotivation();
    }, [language]);



    function getFavMotiIds() {
        const favIds = localStorage.getItem('favoriteMotivationIds');
        if (!favIds) return;
        const favIdsArray = favIds.split(',').map(item => item.trim());
        // setFavMotiIds(favIdsArray);
        return favIdsArray;
    }

    async function setMotivation(motivationId: string, language: string) {
        const res = await api.get('motivation/nextMotivation', {
            params: {
                lastMotivationId: motivationId,
                language
            },
        });

        setMotivationText(res.data.text.text);
        setMotivationAuthor(res.data.author.text);
    }

    async function nextMotivation() {
        try {
            const favIdsArray = getFavMotiIds();
            if (!favIdsArray) return;

            const nextMotiCount = (motiCount + 1) % favIdsArray.length;
            setMotiCount(nextMotiCount);

            const nextMotivationId = favIdsArray[nextMotiCount];
            const isFav = favIdsArray.includes(nextMotivationId);
            setIsFavored(isFav);
            await setMotivation(nextMotivationId, language);
        } catch (e) {
            console.log(e)
        }
    }

    async function favoriteToggle() {
        const favIdsArray = getFavMotiIds();
        if (!favIdsArray) {
            return;
        }
        const motivationId = favIdsArray[motiCount];
        const nextMotivationId = favIdsArray[motiCount + 1];
        await api.post('/favorites/toggle', { motivationId });

        const newFavIdsArray = favIdsArray.filter(data => data !== motivationId).join();
        localStorage.setItem('favoriteMotivationIds', newFavIdsArray);

        if (newFavIdsArray.length === 0) {
            setMotivationAuthor('');
            setMotivationText('There is no favorite motivation.');
            setIsFavored(false);
            return;
        }

        await setMotivation(nextMotivationId, language);
        const isFav = favIdsArray.includes(nextMotivationId);
        setIsFavored(isFav);
    }





    function onPressSignOut() {
        setIsModalOpen(true);
    }

    function onPressMotivation() {
        router.push('/motivation')
    }

    async function confirmSignOut() {
        localStorage.clear();
        await axios.post("/api/auth/signOut");
        router.push('/');
    }

    function changeLanguage(language: string) {
        localStorage.setItem("language", language);
        setLanguage(language);
        api.patch('users/changeLanguage', {
            language
        })
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 font-sans text-slate-900">
            {/* --- 로그아웃 모달 --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white p-6 rounded-3xl shadow-2xl border w-full max-w-sm flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-200">
                        <div className="text-center">
                            <h2 className="text-xl font-bold mb-2">Sign Out</h2>
                            <p className="text-slate-500">Would you really like to SignOut?</p>
                        </div>
                        <div className="flex gap-3 w-full">
                            <button
                                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-all font-medium"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl transition-all font-medium shadow-lg shadow-red-200"
                                onClick={() => confirmSignOut()}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- 메인 카드 섹션 --- */}
            <div className="w-full max-w-md bg-white rounded-4xl shadow-xl shadow-slate-200/60 p-10 border border-slate-100 flex flex-col gap-10">
                <div className="flex gap-2 justify-center">
                    <div
                        className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl transition-all"
                        title="title"
                    >
                        <span className="text-xl  font-medium  text-slate-800">My Favorite</span>
                    </div>
                </div>

                {/* 명언 영역 */}
                <div className="flex flex-col gap-6 text-center min-h-40 justify-center">
                    <p className="text-2xl md:text-3xl font-medium leading-relaxed italic text-slate-800">
                        "{motivationText || "Now loading..."}"
                    </p>
                    <p className="text-slate-400 font-medium">
                        — {motivationAuthor}
                    </p>
                </div>

                {/* 하단 컨트롤 영역 */}
                <div className="flex flex-col gap-4">
                    <div className="flex">
                        {/* Next 버튼 */}
                        <button
                            onClick={() => nextMotivation()}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-2xl transition-all font-semibold text-lg shadow-lg shadow-indigo-100"
                        >
                            Next Motivation
                        </button>
                        <Heart
                            className="w-12 h-11 items-center m-2"
                            onClick={() => favoriteToggle()}
                            color={isFavored ? "red" : 'black'}
                            fill={isFavored ? "red" : 'none'}
                            strokeWidth={2}
                        />
                    </div>


                    <div className="flex items-center gap-2">
                        {/* 언어 선택 */}
                        <select
                            className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                            value={language}
                            onChange={(e) => changeLanguage(e.target.value)
                            }
                        >
                            <option value="" disabled>Select Language</option>
                            {Langs.map((lang) => (
                                <option key={lang.value} value={lang.value}>
                                    {lang.label}
                                </option>
                            ))}
                        </select>

                        {/* 즐겨찾기 페이지 이동 버튼 */}
                        <button
                            onClick={() => onPressMotivation()}
                            className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 rounded-xl transition-all"
                            title="Sign Out"
                        >
                            {/* 아이콘 대신 텍스트 혹은 기호 사용 가능 */}
                            <span className="text-sm font-medium">motivation</span>
                        </button>

                        {/* 로그아웃 버튼 */}
                        <button
                            onClick={() => onPressSignOut()}
                            className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 rounded-xl transition-all"
                            title="Sign Out"
                        >
                            {/* 아이콘 대신 텍스트 혹은 기호 사용 가능 */}
                            <span className="text-sm font-medium">Exit</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}
