'use client';

// 📁 src/app/page.tsx

import dynamic from 'next/dynamic';

// import WordEditor from '@/components/WordEditor';

const WordEditor = dynamic(() => import('@/components/WordEditor'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Word Editor (Tiptap + Next.js)</h1>
      <WordEditor />
    </main>
  );
}