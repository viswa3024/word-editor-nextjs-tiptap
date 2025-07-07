'use client';

import { Editor } from '@tiptap/react';
import classNames from 'classnames';

interface Props {
  editor: Editor | null;
}

const fontSizes = ['8px','9px','10px','11px','12px','14px','16px','18px','20px','24px','30px'];
const fontFamilies = ['Arial','Georgia','Courier New','Times New Roman'];

const Toolbar = ({ editor }: Props) => {
  if (!editor) return null;

  const applyClass = (isActive: boolean) =>
    classNames('px-2 py-1 border rounded text-sm', {
      'bg-blue-500 text-white': isActive,
      'bg-gray-100 hover:bg-gray-200': !isActive,
    });

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={applyClass(editor.isActive('bold'))}>Bold</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={applyClass(editor.isActive('italic'))}>Italic</button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={applyClass(editor.isActive('underline'))}>Underline</button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={applyClass(editor.isActive('strike'))}>Strike</button>
      <button onClick={() => editor.chain().focus().toggleCode().run()} className={applyClass(editor.isActive('code'))}>Monospace</button>
      <button onClick={() => editor.chain().focus().toggleSuperscript().run()} className={applyClass(editor.isActive('superscript'))}>Sup</button>
      <button onClick={() => editor.chain().focus().toggleSubscript().run()} className={applyClass(editor.isActive('subscript'))}>Sub</button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={applyClass(editor.isActive('bulletList'))}>Unordered</button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={applyClass(editor.isActive('orderedList'))}>Ordered</button>
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={applyClass(editor.isActive({ textAlign: 'left' }))}>Left</button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={applyClass(editor.isActive({ textAlign: 'center' }))}>Center</button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={applyClass(editor.isActive({ textAlign: 'right' }))}>Right</button>
      <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={applyClass(editor.isActive({ textAlign: 'justify' }))}>Justify</button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={applyClass(editor.isActive('blockquote'))}>Blockquote</button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={applyClass(editor.isActive('codeBlock'))}>Code</button>
      <select onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()} defaultValue="">
        <option value="" disabled>Font Size</option>
        {fontSizes.map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
      <select onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()} defaultValue="">
        <option value="" disabled>Font Family</option>
        {fontFamilies.map(font => (
          <option key={font} value={font}>{font}</option>
        ))}
      </select>
      <input type="color" onChange={(e) => editor.chain().focus().setColor(e.target.value).run()} />
      <button onClick={() => editor.chain().focus().undo().run()} className={applyClass(false)}>Undo</button>
      <button onClick={() => editor.chain().focus().redo().run()} className={applyClass(false)}>Redo</button>
    </div>
  );
};

export default Toolbar;
