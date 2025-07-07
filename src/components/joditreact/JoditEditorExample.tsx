'use client'

import { useState, useRef, useMemo } from "react";
import JoditEditor from './JoditEditorWrapper' // ← use the dynamic version
import HTMLReactParser from "html-react-parser";

export default function WordEditor() {
 const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
    height: 500,
    toolbarAdaptive: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
    buttons: [
      'undo', 'redo', '|',
      'bold', 'italic', 'underline', '|',
      'fontsize', 'font', 'brush', '|',
      'paragraph', 'align', '|',
      'ul', 'ol', 'outdent', 'indent', '|',
      'image', 'table', 'link', '|',
      'emoji', 'hr', 'copyformat', '|',
      'fullsize'
    ],
    font: {
      list: {
        'Arial': 'Arial, Helvetica, sans-serif',
        'Georgia': 'Georgia, serif',
        'Times New Roman': 'Times New Roman, Times, serif',
        'Courier New': 'Courier New, Courier, monospace',
        'Verdana': 'Verdana, Geneva, sans-serif'
      }
    }
  }

  return (
    <div>
      <h1>Welcome to Ageee Dev</h1>

      <JoditEditor
        ref={editor}
        config={config}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />

      <div>{HTMLReactParser(content)}</div>
    </div>
  );
}
