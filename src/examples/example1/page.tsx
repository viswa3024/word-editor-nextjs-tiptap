import WordEditor from '@/components/WordEditor';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Word Editor - Tiptap + Next.js</h1>
      <WordEditor />
    </main>
  );
}
