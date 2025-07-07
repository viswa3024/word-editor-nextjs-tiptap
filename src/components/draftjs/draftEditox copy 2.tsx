// @ts-nocheck
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), {
  ssr: false,
});

export default function DraftEditorPage() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [rawJson, setRawJson] = useState({});

  // Load initial content using Draft.js raw JSON
  useEffect(() => {
    let isMounted = true;

    // Simulated saved raw JSON (from convertToRaw previously)
    const savedRaw = {
      blocks: [
        {
          key: 'first',
          text: 'Hello World! This is bold and italic.',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [
            { offset: 18, length: 4, style: 'BOLD' },
            { offset: 27, length: 6, style: 'ITALIC' },
          ],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    };

    if (isMounted) {
      const contentState = convertFromRaw(savedRaw);
      const state = EditorState.createWithContent(contentState);
      setEditorState(state);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const onEditorStateChange = (state) => {
    setEditorState(state);
    const raw = convertToRaw(state.getCurrentContent());

    console.log("raw: ", raw)
    setRawJson(raw);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📝 Word Editor (Draft.js only)</h1>

      <div className="bg-[#F8F9FA] min-h-screen pb-16">
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
          wrapperClassName="wrapper-class"
         editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border"
        
        />
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">🧾 Raw JSON Output</h2>
        <pre className="bg-gray-100 p-4 text-sm overflow-auto border">
          {JSON.stringify(rawJson, null, 2)}
        </pre>
      </div>
    </div>
  );
}




// // @ts-nocheck

// 'use client';

// import dynamic from 'next/dynamic';
// import { useEffect, useState } from 'react';
// import {
//   EditorState,
//   convertToRaw,
//   convertFromRaw,
//   ContentState,
// } from 'draft-js';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// const Editor = dynamic(
//     // @ts-ignore
//   () => import('react-draft-wysiwyg').then(mod => mod.Editor),
//   { ssr: false }
// );

// export default function DraftEditorPage() {

//     const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const [rawJson, setRawJson] = useState({});

  


//    const onEditorStateChange = (state) => {
//     setEditorState(state);
//     const raw = convertToRaw(state.getCurrentContent());
//     console.log(raw);
//   };


//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">📝 Word Editor (Draft.js)</h1>
//       <div className="bg-[#F8F9FA] min-h-screen pb-16">
//         <Editor 
//            editorState={editorState}
//            onEditorStateChange={onEditorStateChange}
//            toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
//            wrapperClassName="wrapper"
//            editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border" />
//       </div>
      
//     </div>
//   );
// }
