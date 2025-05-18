'use client'

import { useEffect, useState } from 'react'
import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Notification({ message, type, onClose }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!visible) return null

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
      type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
    }`}>
      <div className="flex items-center">
        {type === 'success' ? (
          <CheckCircleIcon className="h-6 w-6 mr-2" />
        ) : (
          <ExclamationCircleIcon className="h-6 w-6 mr-2" />
        )}
        <span>{message}</span>
        <button onClick={() => {
          setVisible(false)
          onClose()
        }} className="ml-4">
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}