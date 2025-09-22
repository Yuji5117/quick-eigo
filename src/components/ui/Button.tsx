import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: ButtonVariant
}

const getVariantClasses = (variant: ButtonVariant): string => {
  switch (variant) {
    case 'primary':
      return 'bg-primary hover:bg-primary/90 text-primary-foreground'
    case 'secondary':
      return 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
    case 'danger':
      return 'bg-red-500 hover:bg-red-600 text-white'
    default:
      return 'bg-primary hover:bg-primary/90 text-primary-foreground'
  }
}

export const Button = ({
  children,
  variant = 'primary',
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const variantClasses = getVariantClasses(variant)
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  return (
    <button
      {...props}
      disabled={disabled}
      className={`rounded-lg p-4 shadow-md ${variantClasses} ${disabledClasses} ${className || ''}`}
    >
      {children}
    </button>
  )
}
