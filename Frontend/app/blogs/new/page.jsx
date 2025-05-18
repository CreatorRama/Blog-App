'use client'

import { useAuth } from '../../components/AuthProvider'
import BlogForm from '../../components/BlogForm'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NewBlogPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogForm />
    </div>
  )
}