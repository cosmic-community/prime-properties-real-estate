import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-secondary-900 mb-4">404</h1>
        <p className="text-xl text-secondary-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}