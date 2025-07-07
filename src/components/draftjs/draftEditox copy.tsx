'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
// @ts-ignore
import draftToHtml from 'draftjs-to-html';
// @ts-ignore
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(
    // @ts-ignore
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
);

export default function DraftEditorPage() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [htmlContent, setHtmlContent] = useState('');

  const onEditorStateChange = (state: EditorState) => {
    setEditorState(state);
    const rawContent = convertToRaw(state.getCurrentContent());
    const html = draftToHtml(rawContent);
    setHtmlContent(html);
  };

  const loadHtmlContent = () => {
    const html = '<p>Hello <strong>World!</strong> This is a saved HTML</p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  };

  useEffect(() => {
    loadHtmlContent();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📝 Word Editor (Draft.js)</h1>
      <div className="border border-gray-300 p-2 min-h-[300px] bg-white">
        <Editor
        // @ts-ignore
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            options: [
              'inline',
              'blockType',
              'fontSize',
              'list',
              'textAlign',
              'colorPicker',
              'link',
              'embedded',
              'emoji',
              'remove',
              'history',
            ],
          }}
          editorClassName="px-3 min-h-[200px]"
        />
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">🔍 HTML Output</h2>
        <pre className="bg-gray-100 p-4 overflow-auto text-sm">
          {htmlContent}
        </pre>
      </div>
    </div>
  );
}
