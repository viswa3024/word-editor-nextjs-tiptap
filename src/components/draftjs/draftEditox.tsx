// @ts-nocheck
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// Dynamically load Editor to avoid SSR issues
const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});

export default function Page() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [mounted, setMounted] = useState(false);

  // Ensures component is mounted before rendering Editor (fixes setState error)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">📝 Draft.js Editor</h1>

      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbarClassName="bg-gray-100 border-b px-2"
        wrapperClassName="border border-gray-300 rounded"
        editorClassName="p-3 min-h-[200px] bg-white"
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'fontFamily',
            'list',
            'textAlign',
            'colorPicker',
            'link',
            'embedded',
            'emoji',
            'image',
            'remove',
            'history',
          ],
        }}
      />
    </div>
  );
}
