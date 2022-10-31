import { Link } from "@remix-run/react"

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
  
const Header = () => (
  <nav className="flex items-center h-16 mx-2 md:mx-0" aria-label="navigation">
    <Link to="/" className="text-xl text-white">
      Sonu Rai
    </Link>
    <Link to="/" className="ml-4 text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md">
      Wallpapers
    </Link>
    <Link to="/about" className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md">
      About
    </Link>
  </nav>
)

const Footer = () => (
  <footer className="mt-4 mb-16 mx-2 md:mx-0 text-gray-400">&copy; 2013-{new Date().getFullYear()} Amarjeet Rai</footer>
)
