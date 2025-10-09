'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/decks',
      label: 'Decks',
      icon: (active: boolean) => (
        <svg
          className={`h-6 w-6 ${active ? 'text-blue-600' : 'text-gray-400'}`}
          fill={active ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      href: '/',
      label: 'Quiz',
      icon: (active: boolean) => (
        <svg
          className={`h-6 w-6 ${active ? 'text-blue-600' : 'text-gray-400'}`}
          fill={active ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white">
      <div className="flex">
        {navItems.map(item => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 flex-col items-center justify-center px-4 py-3 hover:bg-gray-50"
            >
              {item.icon(isActive)}
              <span
                className={`mt-1 text-xs ${isActive ? 'font-medium text-blue-600' : 'text-gray-400'}`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
