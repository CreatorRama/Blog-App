'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '../lib/api'
import BlogEditor from './BlogEditor'
import { toast } from 'react-hot-toast'

export default function BlogForm({ blog = null }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = async (data) => {
    setIsSubmitting(true)
    try {
      if (blog) {
        await api.put(`/blogs/${blog._id}`, data)
      } else {
        await api.post('/blogs', data)
      }
      router.push('/blogs')
    } catch (error) {
      toast.error('Failed to save blog')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePublish = async (data) => {
    setIsSubmitting(true)
    try {
      if (blog) {
        await api.put(`/blogs/${blog._id}`, { ...data, status: 'published' })
      } else {
        await api.post('/blogs', { ...data, status: 'published' })
      }
      router.push('/blogs')
    } catch (error) {
      toast.error('Failed to publish blog')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <BlogEditor
      initialTitle={blog?.title || ''}
      initialContent={blog?.content || ''}
      initialTags={blog?.tags || []}
      initialStatus={blog?.status || 'draft'}
      onSave={handleSave}
      onPublish={handlePublish}
      blogId={blog?._id}
    />
  )
}