'use client'

import JoditEditor from 'jodit-react'
import { useRef, useState } from 'react'

export default function JoditEditorExample() {
  const editor = useRef(null)
  const [content, setContent] = useState<string>('')

  const config = {
    readonly: false,
    height: 500,
    toolbarAdaptive: false,
    toolbarSticky: false,
    uploader: {
      insertImageAsBase64URI: true, // allow base64 image upload
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

  const downloadAsHtml = async () => {
    const { saveAs } = await import('file-saver')
    const blob = new Blob([content], { type: 'text/html;charset=utf-8' })
    saveAs(blob, 'document.html')
  }

  const downloadAsDocx = async () => {
    const htmlDocx = (await import('html-docx-js/dist/html-docx')).default
    const { saveAs } = await import('file-saver')
    const docxBlob = htmlDocx.asBlob(content)
    saveAs(docxBlob, 'document.docx')
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📝 Word Editor</h1>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onChange={(newContent) => setContent(newContent)}
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
