import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          RealEstate
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Properties
          </Link>
          <Link href="/" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
