import "../css/home.css"
import faceShape from "../Images/faceShape.jpeg"
import ImageCard from "../Components/imageCard"
import { useState, useEffect} from "react"
import { generateImage } from "../Services/api"


function Home() {
  const [isUploaded, setIsUploaded] = useState(false)
  const [userImage, setUserImage] = useState(null)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [isForward, setIsForward] = useState(false)
  const [isBackward, setIsBackward] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [imageLoading, setImageLoading] = useState(false)
  const [error, setError] = useState("No errors detected")

  const configs = {
    selectedTime,
    isForward,
    isBackward,
    userImage
  }

  const scrollToMain = () => {
    document.querySelector('.home-container').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUserImage(file)
      setIsUploaded(true)
    }
  }


  const handleButtonClick = (action) => {
    if (action === 'forward') {
      setIsForward(!isForward)
      setIsBackward(false) 
    } else if (action === 'backward') {
      setIsBackward(!isBackward)
      setIsForward(false) 
    }
  }

  const handleGenerateClick = async() => {
    if (!userImage) return
    if (!isForward && !isBackward) return
    if (selectedTime === "") return
    setImageLoading(true)

    try{
        const response = await generateImage(configs)
        console.log('Generated image response:', response) 
        console.log('Response type:', typeof response)
        setGeneratedImage(response)
        console.log('GeneratedImage state set to:', response) 
    } catch (err) {
        console.log('Error:', err) 
        setError("Failed to generate image...")
    } finally {
        setImageLoading(false)
        setError("No errors detected")
    }
}
  


  return (
    <>
    <section className="home-hero-section">
    <div className="hero-shape shape-1"></div>
    <div className="hero-shape shape-2"></div>
    <div className="hero-shape shape-3"></div>
    <div className="hero-shape shape-4"></div>
    
    <div className="home-hero-content">
      <h1 className="home-hero-title">Face Portal</h1>
      <p className="home-hero-subtitle">
        Step through time and see yourself at any age with the power of AI
      </p>
      <button className="home-hero-cta" onClick={scrollToMain}>
        Enter the Portal
      </button>
    </div>
  </section>
    <div className="home-container">
      {isUploaded ? (
        <>
        <div className="input-container">
            <div className="configs">
                <p>Configurations:</p>
                <button className={`age-forward-btn ${isForward ? "active" : ""}`} onClick={() => handleButtonClick('forward')}>Age Forward</button>
                <button className={`age-backward-btn ${isBackward ? "active" : ""}`} onClick={() => handleButtonClick('backward')}>Age Backward</button>
                <select className="select-time-menu"
                        value={selectedTime}
                        onChange={(e) => (setSelectedTime(e.target.value))}>
                    <option value="">Time</option>
                    <option value= "2">10 years</option>
                    <option value="4">20 years</option>
                </select>
            </div>
            <div className="button-container">
                <button className="generate-btn" onClick={handleGenerateClick}>Generate Image</button>
            </div>
        </div>
        {/* Initially only one card is rendered. Then 2 cards side by side when image is generated */}
        <div className="image-containter">
            <ImageCard image={userImage} />
            {generatedImage ? (<ImageCard image={generatedImage}/>) : null}
        </div>
        </>
      ) : (
        <>
          <div className="intro">
            <section className="intro-section">
            <h1 className="intro-title">
              Upload a photo and choose your destination!
            </h1>
            </section>
            <label className="upload-btn">
              Upload Image
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="input-image"
                onChange={handleFileChange}
                hidden
              />
            </label>
          </div>
          <ImageCard image={faceShape} />
        </>
      )}
    </div>
    </>
  )  
}

export default Home
