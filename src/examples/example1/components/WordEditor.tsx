'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
//import { ToggleButtonGroup, ToggleButton } from './ToggleButtonGroup';
import { ToggleButtonGroup } from './ToggleButtonGroup';

import './editor.css'; // Styling


const WordEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: '<p>Hello <u>Word</u> Editor!</p>',
  });

  return (
    <div className="p-4 border rounded-xl shadow-md bg-white">
      <ToggleButtonGroup editor={editor} />
      <div className="border mt-2 p-3 rounded-md min-h-[300px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default WordEditor;
