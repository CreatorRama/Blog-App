'use client'

import { useParams } from 'next/navigation'
import { useAuth } from '../../../components/AuthProvider'
import BlogForm from '../../../components/BlogForm'
import { useEffect, useState } from 'react'
import api from '../../../lib/api'
import { useRouter } from 'next/navigation'

export default function EditBlogPage() {
  const { id } = useParams()
  const { user, loading } = useAuth()
  const [blog, setBlog] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
      return
    }

    const fetchBlog = async () => {
      try {
        const { data } = await api.get(`/blogs/${id}`)
        setBlog(data.data)
      } catch (error) {
        console.error(error)
        router.push('/blogs')
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchBlog()
    }
  }, [user, loading, id, router])

  if (loading || isLoading || !user) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (!blog) {
    return <div className="text-center py-8">Blog not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogForm blog={blog} />
    </div>
  )
}