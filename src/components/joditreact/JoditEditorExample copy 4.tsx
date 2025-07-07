'use client'

import { useRef, useState } from 'react'
import JoditEditor from './JoditEditorWrapper' // ← use the dynamic version

export default function WordEditor() {
  const editorRef = useRef(null)
  const contentRef = useRef<string>('') // avoid value binding
  const [_, forceUpdate] = useState(0)

  const config = {
    readonly: false,
    height: 500,
    uploader: { insertImageAsBase64URI: true },
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

  const downloadAsHtml = async () => {
    const { saveAs } = await import('file-saver')
    const blob = new Blob([contentRef.current], { type: 'text/html;charset=utf-8' })
    saveAs(blob, 'document.html')
  }

  const downloadAsDocx = async () => {
    const htmlDocx = (await import('html-docx-js/dist/html-docx')).default
    const { saveAs } = await import('file-saver')
    const docxBlob = htmlDocx.asBlob(contentRef.current)
    saveAs(docxBlob, 'document.docx')
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📝 Word Editor (Jodit + Emoji)</h1>

      <JoditEditor
        ref={editorRef}
        config={config}
        onBlur={(newContent: string) => {
          contentRef.current = newContent
          forceUpdate(n => n + 1)
        }}
      />

      <div className="mt-4 flex gap-4">
        <button
          onClick={downloadAsHtml}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ⬇️ Download HTML
        </button>
        <button
          onClick={downloadAsDocx}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ⬇️ Download DOCX
        </button>
      </div>
    </div>
  )
}
