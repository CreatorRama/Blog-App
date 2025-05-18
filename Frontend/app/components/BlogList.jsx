'use client'

import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { useEffect, useState } from 'react'
import api from '../lib/api'
import { toast } from 'react-hot-toast'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'

export default function BlogsList() {
  const { user } = useAuth()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedBlogIds, setExpandedBlogIds] = useState([])

  useEffect(() => {
    if (user) {
      fetchBlogs()
    }
  }, [user])

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get('/blogs')
      setBlogs(data.data)
    } catch (error) {
      toast.error('Failed to fetch blogs')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return
    
    try {
      await api.delete(`/blogs/${id}`)
      toast.success('Blog deleted successfully')
      fetchBlogs()
    } catch (error) {
      toast.error('Failed to delete blog')
      console.error(error)
    }
  }

  const toggleExpand = (blogId) => {
    setExpandedBlogIds(prev => {
      if (prev.includes(blogId)) {
        return prev.filter(id => id !== blogId)
      } else {
        return [...prev, blogId]
      }
    })
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No blogs found.</p>
        <Link href="/blogs/new" className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Create New Blog
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Blogs</h1>
        <Link href="/blogs/new" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          New Blog
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div 
            key={blog._id} 
            className="bg-white rounded-lg shadow-md border border-gray-200 align-top"
            style={{ height: 'auto', alignSelf: 'flex-start' }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  blog.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {blog.status}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="mb-4">
                <div
                  className="text-blue-600"
                  style={{
                    maxHeight: expandedBlogIds.includes(blog._id) ? 'none' : '3em',
                    overflow: expandedBlogIds.includes(blog._id) ? 'visible' : 'hidden',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}
                >
                  {blog.content}
                </div>
                <button 
                  onClick={() => toggleExpand(blog._id)} 
                  className="text-indigo-600 text-sm font-medium hover:text-indigo-800 mt-2"
                >
                  {expandedBlogIds.includes(blog._id) ? 'Show less' : 'Read more'}
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Last updated: {new Date(blog.updatedAt).toLocaleDateString()}
                </div>
                
                <div className="flex space-x-2">
                  <Link 
                    href={`/blogs/${blog._id}/edit`} 
                    className="p-2 text-indigo-600 hover:text-indigo-800"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </Link>
                  <button 
                    onClick={() => handleDelete(blog._id)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}