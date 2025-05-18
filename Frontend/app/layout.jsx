import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import { AuthProvider } from './components/AuthProvider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog Editor',
  description: 'A simple blog editor with auto-save functionality',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen">
            <Header />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
          <Toaster position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  )
}