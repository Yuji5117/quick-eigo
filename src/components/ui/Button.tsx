import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`cursor-pointer rounded py-2 text-white ${props.className || ''}`}
    >
      {children}
    </button>
  )
}
