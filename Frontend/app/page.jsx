import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-6">Welcome to Blog Editor</h1>
      <p className="text-xl mb-8">Create, edit, and publish your blog posts with ease</p>
      <div className="space-x-4">
        <Link href="/auth/login" className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Sign In
        </Link>
        <Link href="/auth/register" className="px-6 py-3 bg-white text-indigo-600 rounded-md hover:bg-gray-100 border border-indigo-600">
          Register
        </Link>
      </div>
    </div>
  )
}