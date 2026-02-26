import Link from 'next/link';
import Image from 'next/image'
import mIcon from '../public/img/motivation_maker_icon.png'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 font-sans">
      {/* 중앙 카드 컨테이너 */}
      <div className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-12 border border-slate-100 flex flex-col items-center text-center">

        {/* 서비스 로고/아이콘 영역 (임시) */}
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 ">
          <Image
            src={mIcon}
            alt='mIcon'
          />
        </div>

        {/* 환영 문구 */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
            Motivation
          </h1>
          <p className="text-slate-400 leading-relaxed">
            A single line of inspiration <br />
            that wakes you up every morning
          </p>
        </div>

        {/* 버튼 그룹 */}
        <div className="w-full flex flex-col gap-4">
          <Link
            href="/login"
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-2xl transition-all font-bold text-lg shadow-lg shadow-indigo-100 flex items-center justify-center"
          >
            Start
          </Link>

          <Link
            href="/signup"
            className="w-full py-4 bg-white border-2 border-slate-100 hover:border-indigo-100 hover:bg-slate-50 active:scale-[0.98] text-slate-600 rounded-2xl transition-all font-semibold text-lg flex items-center justify-center"
          >
            Sign Up
          </Link>
        </div>

        {/* 하단 푸터 느낌 */}
        <p className="mt-12 text-xs text-slate-300 font-medium tracking-widest uppercase">
          Focus • Inspire • Growth
        </p>
      </div>
    </div>
  );
}
