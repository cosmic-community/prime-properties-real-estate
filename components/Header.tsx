import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-xl font-bold text-secondary-900">Prime Properties</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/properties" className="text-secondary-700 hover:text-primary-600 font-medium transition-colors">
              Properties
            </Link>
            <Link href="/agents" className="text-secondary-700 hover:text-primary-600 font-medium transition-colors">
              Agents
            </Link>
            <Link href="/neighborhoods" className="text-secondary-700 hover:text-primary-600 font-medium transition-colors">
              Neighborhoods
            </Link>
          </nav>
          
          <Link
            href="/agents"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  )
}