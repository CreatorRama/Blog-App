'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useDebounce } from '../lib/utils'
import { toast } from 'react-hot-toast'

export default function BlogEditor({ 
  initialTitle = '', 
  initialContent = '', 
  initialTags = [], 
  initialStatus = 'draft',
  onSave,
  onPublish,
  blogId = null
}) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [tags, setTags] = useState(initialTags.join(', '))
  const [status, setStatus] = useState(initialStatus)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  
  const debouncedTitle = useDebounce(title, 1000)
  const debouncedContent = useDebounce(content, 1000)
  const debouncedTags = useDebounce(tags, 1000)
  
  const initialValues = useRef({
    title: initialTitle,
    content: initialContent,
    tags: initialTags.join(', '),
    status: initialStatus
  })

  const handleSave = useCallback(async (saveStatus) => {
    if (!hasChanges && saveStatus === status) return
    
    setIsSaving(true)
    try {
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      
      await onSave({
        title,
        content,
        tags: tagArray,
        status: saveStatus
      })
      
      initialValues.current = { title, content, tags, status: saveStatus }
      setStatus(saveStatus)
      setHasChanges(false)
      
      toast.success(saveStatus === 'published' 
        ? 'Blog published successfully!' 
        : 'Draft saved successfully!')
    } catch (error) {
      toast.error('Failed to save blog')
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }, [hasChanges, status, tags, title, content, onSave])

  // Auto-save after inactivity
  useEffect(() => {
    if (!hasChanges) return
    
    const timer = setTimeout(() => {
      if (hasChanges) {
        handleSave('draft')
      }
    }, 30000)
    
    return () => clearTimeout(timer)
  }, [hasChanges, handleSave])

  // Check for changes
  useEffect(() => {
    const currentValues = { title, content, tags, status }
    const changes = Object.keys(currentValues).some(
      key => currentValues[key] !== initialValues.current[key]
    )
    setHasChanges(changes)
  }, [title, content, tags, status])

  const handlePublish = () => {
    handleSave('published')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {blogId ? 'Edit Blog' : 'Create New Blog'}
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={() => handleSave('draft')}
            disabled={isSaving || !hasChanges}
            className={`px-4 py-2 rounded-md ${
              isSaving || !hasChanges
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            onClick={handlePublish}
            disabled={isSaving}
            className={`px-4 py-2 rounded-md ${
              isSaving
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isSaving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="Enter blog title"
        />
      </div>
      
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="e.g., technology, programming, web"
        />
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border min-h-[400px]"
          placeholder="Write your blog content here..."
        />
      </div>
      
      {hasChanges && (
        <div className="text-sm text-gray-500">
          You have unsaved changes. {status === 'draft' ? 'Auto-save in ' : 'Save to update.'}
        </div>
      )}
    </div>
  )
}