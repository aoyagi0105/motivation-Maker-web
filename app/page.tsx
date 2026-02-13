import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2 text-xl">
      <Link href="/signup" className="bg-blue-100 rounded-lg px-3 py-1 active:bg-blue-700 border-3 ml-2 w-50">
        Sign Up
      </Link>
      <Link href="/login" className="bg-blue-100 rounded-lg px-3 py-1 active:bg-blue-700 border-3 ml-2 w-50">
        Login
      </Link>
    </div>
  );
}
