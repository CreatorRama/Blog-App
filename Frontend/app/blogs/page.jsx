'use client'

import { useAuth } from '../components/AuthProvider'
import BlogsList from '../components/BlogList'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function BlogsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Blog Posts</h1>
        <p className="text-gray-600">Manage your published posts and drafts</p>
      </div>
      <BlogsList />
    </div>
  )
}