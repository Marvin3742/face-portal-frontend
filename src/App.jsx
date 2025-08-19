import "./css/app.css"
import {Routes, Route} from "react-router-dom"
import Navbar from "./Components/navbar"
import Home from "./Pages/home"
import Gallery from "./Pages/gallery"
import Login from "./Pages/login"
import About from "./Pages/about"
import Contact from "./Pages/contact"
import Footer from "./Components/footer"

function App() {
  return (
    <>
    <Navbar/>
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </main>
    <Footer/>
    </>
  )
}

export default App
