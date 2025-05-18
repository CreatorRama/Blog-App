'use client'

import { useParams } from 'next/navigation'
import { useAuth } from '../../components/AuthProvider'
import { useEffect, useState } from 'react'
import api from '../../lib/api'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function BlogDetailPage() {
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
        toast.error('Failed to fetch blog')
        router.push('/blogs')
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchBlog()
    }
  }, [user, loading, id, router])

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog?')) return
    
    try {
      await api.delete(`/blogs/${id}`)
      toast.success('Blog deleted successfully')
      router.push('/blogs')
    } catch (error) {
      toast.error('Failed to delete blog')
      console.error(error)
    }
  }

  if (loading || isLoading || !user) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (!blog) {
    return <div className="text-center py-8">Blog not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/blogs" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Blogs
        </Link>
      </div>
      
      <article className="prose lg:prose-xl max-w-none">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold">{blog.title}</h1>
          {blog.author._id === user.id && (
            <div className="flex space-x-4">
              <Link
                href={`/blogs/${blog._id}/edit`}
                className="text-indigo-600 hover:text-indigo-800"
              >
                <PencilIcon className="h-5 w-5" />
              </Link>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
              {tag}
            </span>
          ))}
          <span className={`px-2 py-1 text-xs rounded-full ${
            blog.status === 'published' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {blog.status}
          </span>
        </div>
        
        <div className="text-sm text-gray-500 mb-8">
          Last updated: {new Date(blog.updatedAt).toLocaleDateString()}
        </div>
        
        <div className="prose max-w-none">
          {blog.content}
        </div>
      </article>
    </div>
  )
}