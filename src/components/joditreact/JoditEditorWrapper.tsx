'use client'

import dynamic from 'next/dynamic'

// Dynamically load JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })
export default JoditEditor
