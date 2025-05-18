'use client'

import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { usePathname } from 'next/navigation'
import { Bars3Icon } from '@heroicons/react/24/outline'

export default function Header() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  if (pathname.startsWith('/auth')) return null

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          Blog Editor
        </Link>
        
        <nav className="flex items-center space-x-6">
          {user ? (
            <>
              <Link href="/blogs" className="hover:text-indigo-600">
                My Blogs
              </Link>
              <Link href="/blogs/new" className="hover:text-indigo-600">
                New Blog
              </Link>
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-indigo-600">
                Login
              </Link>
              <Link href="/auth/register" className="hover:text-indigo-600">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}