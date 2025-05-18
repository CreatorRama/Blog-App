'use client'

import { useAuth } from '../components/AuthProvider'
import { useEffect, useState } from 'react'
import api from '../lib/api'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const [stats, setStats] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
      return
    }

    const fetchStats = async () => {
      try {
        const { data } = await api.get('/blogs')
        const blogs = data.data
        
        const publishedCount = blogs.filter(blog => blog.status === 'published').length
        const draftCount = blogs.filter(blog => blog.status === 'draft').length
        
        setStats({
          total: blogs.length,
          published: publishedCount,
          drafts: draftCount,
          latest: blogs.slice(0, 3)
        })
      } catch (error) {
        toast.error('Failed to fetch blog stats')
        console.error(error)
      }
    }

    if (user) {
      fetchStats()
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
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {stats ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-medium text-gray-500">Total Posts</h3>
              <p className="text-3xl font-bold mt-2">{stats.total}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-medium text-gray-500">Published</h3>
              <p className="text-3xl font-bold mt-2">{stats.published}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-medium text-gray-500">Drafts</h3>
              <p className="text-3xl font-bold mt-2">{stats.drafts}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Posts</h2>
              <Link href="/blogs" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                View All <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            {stats.latest.length > 0 ? (
              <div className="space-y-4">
                {stats.latest.map(blog => (
                  <div key={blog._id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-medium">{blog.title}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        blog.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(blog.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recent posts found</p>
            )}
          </div>
          
          <div className="flex justify-end">
            <Link 
              href="/blogs/new" 
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Create New Blog
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">Loading blog statistics...</div>
      )}
    </div>
  )
}