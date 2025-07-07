'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import Heading from '@tiptap/extension-heading';
//import History from '@tiptap/extension-history';

import { FontSize } from '@/extensions/FontSize';
import { FontFamily } from '@/extensions/FontFamily';
// import Toolbar from './Toolbar';
import './editor.css';
import Toolbar from './Toolbar';

const WordEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false, codeBlock: false }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      Link,
      Image,
      Superscript,
      Subscript,
      CodeBlock,
      Blockquote,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      //History,
      FontSize,
      FontFamily,
    ],
    content: '<p>Start writing your content...</p>',
  });

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-4">
      <Toolbar editor={editor} />
      <div className="border mt-2 p-3 rounded min-h-[300px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default WordEditor;
