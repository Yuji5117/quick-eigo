'use client'

import { useEffect, useRef } from 'react'

type AnswerInputProps = {
  value: string
  onChange: (value: string) => void
  onSubmit?: (answer: string) => void
  questionId?: number
}

export const AnswerInput: React.FC<AnswerInputProps> = ({
  value,
  onChange,
  onSubmit,
  questionId,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [questionId])

  const handleSubmit = () => {
    if (value.trim() && onSubmit) {
      onSubmit(value.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div>
      <textarea
        ref={textareaRef}
        rows={4}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="回答の英文を記入してください... (Ctrl/Cmd + Enter で提出)"
        className="w-full rounded-lg border border-gray-200 p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      />
    </div>
  )
}
