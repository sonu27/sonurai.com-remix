import { Link } from "@remix-run/react"

const Layout = (props) => (
  <div className="container mx-auto">
    <Header />
    {props.children}
    <Footer />
  </div>
)
  
const Header = () => (
  <nav className="" aria-label="navigation">
    <Link to="/">Sonu Rai</Link>
      <Link to="/bingwallpapers">Wallpapers</Link>
      <Link to="/about">About</Link>
  </nav>
)

const Footer = () => (
  <footer className="mt-4 mb-16 text-gray-400">
    <div className="px-3 px-lg-0">&copy; 2013-{new Date().getFullYear()} Amarjeet Rai</div>
  </footer>
)
  
export default Layout
