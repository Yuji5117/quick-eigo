'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface FeedbackDisplayProps {
  feedback: string
}

export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback }) => {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none rounded-lg bg-gray-50 p-6 shadow-sm dark:bg-gray-800">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{feedback}</ReactMarkdown>
    </div>
  )
}
