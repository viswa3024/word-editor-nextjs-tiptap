'use client';

import { Editor } from '@tiptap/react';

interface Props {
  editor: Editor | null;
}

export const ToggleButtonGroup = ({ editor }: Props) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={getClass(editor.isActive('bold'))}>
        Bold
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={getClass(editor.isActive('italic'))}>
        Italic
      </button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={getClass(editor.isActive('underline'))}>
        Underline
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={getClass(editor.isActive('bulletList'))}>
        Bullet
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={getClass(editor.isActive('orderedList'))}>
        Numbered
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={getClass(editor.isActive('heading', { level: 1 }))}>
        H1
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={getClass(editor.isActive('heading', { level: 2 }))}>
        H2
      </button>
    </div>
  );
};

function getClass(active: boolean) {
  return `px-3 py-1 rounded-md text-sm border ${active ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`;
}
