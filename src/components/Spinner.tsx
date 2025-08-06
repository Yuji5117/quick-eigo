'use client'

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
        role="status"
        aria-label="loading"
      />
    </div>
  )
}
