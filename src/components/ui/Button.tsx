import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: ButtonVariant
}

const getVariantClasses = (variant: ButtonVariant): string => {
  switch (variant) {
    case 'primary':
      return 'bg-blue-500 hover:bg-blue-600 text-white'
    case 'secondary':
      return 'bg-gray-500 hover:bg-gray-600 text-white'
    case 'danger':
      return 'bg-red-500 hover:bg-red-600 text-white'
    default:
      return 'bg-blue-500 hover:bg-blue-600 text-white'
  }
}

export const Button = ({ children, variant = 'primary', className, ...props }: ButtonProps) => {
  const variantClasses = getVariantClasses(variant)

  return (
    <button
      {...props}
      className={`cursor-pointer rounded-lg p-4 shadow-md ${variantClasses} ${className || ''}`}
    >
      {children}
    </button>
  )
}
