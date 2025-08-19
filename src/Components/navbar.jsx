import { useState } from "react"
import { Link } from "react-router-dom"
import "../css/navbar.css"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="portal.png" 
        alt="Logo" 
        className="navbar-icon"/>
        <Link to="/" className="app-name">Face Portal</Link>
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link">[HOME]</Link>
        <Link to="/about" className="nav-link">[ABOUT]</Link>
        <Link to="/contact" className="nav-link">[HELP & CONTACT]</Link>
        <Link to="/login" className="nav-link">[SIGN IN/UP]</Link>
      </div>
    </nav>
  )
}

export default Navbar
