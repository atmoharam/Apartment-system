import Link from "next/link"

export function BackToListings() {
  return (
    <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
      ← Back to listings
    </Link>
  )
}
