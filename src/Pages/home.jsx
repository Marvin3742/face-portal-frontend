import "../css/home.css"
import faceShape from "../Images/faceShape.jpeg"
import ImageCard from "../Components/imageCard"
import { useState, useEffect } from "react"
import { generateImage, submitReview } from "../Services/api"

function Home() {
  const [isUploaded, setIsUploaded] = useState(false)
  const [userImage, setUserImage] = useState(null)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [isForward, setIsForward] = useState(false)
  const [isBackward, setIsBackward] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [imageLoading, setImageLoading] = useState(false)
  const [error, setError] = useState("No errors detected")
  const [rating, setRating] = useState(0)
  const [reviewMessage, setReviewMessage] = useState("")
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [status, setStatus] = useState("")

  const configs = {
    selectedTime,
    isForward,
    isBackward,
    userImage
  }

  const scrollToMain = () => {
    document.querySelector('.home-container').scrollIntoView({
      behavior: 'smooth'
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUserImage(file)
      setIsUploaded(true)
      setError("No errors detected")
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

  const handleGenerateClick = async () => {
    if (!userImage || (!isForward && !isBackward) || selectedTime === "") return

    setImageLoading(true)
    setGeneratedImage(null)

    try {
      const response = await generateImage(configs)
      console.log('Generated image response:', response)
      setGeneratedImage(response)
    } catch (err) {
      console.log(err)
      setError("Failed to generate image: " + err.message)
    } finally {
      setImageLoading(false)
    }
  }

  const handleDownload = () => {
  if (!generatedImage) return;

  const link = document.createElement("a");
  link.href = generatedImage; 
  link.download = "generated_image.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};



  const handleGenerateAnother = () => {
    setGeneratedImage(null)
    setIsUploaded(false)
    setUserImage(null)
    setSelectedTime('')
    setIsForward(false)
    setIsBackward(false)
    setRating(0)
    setReviewMessage('')
    setReviewSubmitted(false)
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    setReviewSubmitted(true)
    try {
      const responseMsg = await submitReview(rating, reviewMessage);
      setStatus(responseMsg);
    } catch(err){
      setStatus(err.message);
    }
    };


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
                <button
                  className={`age-forward-btn ${isForward ? "active" : ""}`}
                  onClick={() => handleButtonClick('forward')}
                >
                  Age Forward
                </button>
                <button
                  className={`age-backward-btn ${isBackward ? "active" : ""}`}
                  onClick={() => handleButtonClick('backward')}
                >
                  Age Backward
                </button>
                <select
                  className="select-time-menu"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Time</option>
                  <option value="2">10 years</option>
                  <option value="4">20 years</option>
                </select>
              </div>

              <div className="button-container">
                <button
                  className="generate-btn"
                  onClick={handleGenerateClick}
                  disabled={imageLoading}
                >
                  {imageLoading ? "Generating..." : "Generate Image"}
                </button>
              </div>
            </div>

            {error !== "No errors detected" && (
              <div className="error-message">
                <p>⚠️ {error}</p>
                  <button className="generate-another-btn" onClick={handleGenerateAnother}>
                  Generate Another
                  </button>
              </div>
            )}


            {/* Status indicator */}
            {imageLoading && (
              <div className="loading-indicator">
                <p>Generating your image, please wait...</p>
              </div>
            )}

            <div className="image-container">
              <ImageCard image={userImage} />
              {generatedImage && <ImageCard image={generatedImage} />}
            </div>

            {/* Post-generation actions */}
            {generatedImage && (
              <div className="post-actions">
                <button className="download-btn" onClick={handleDownload}>
                  Download Image
                </button>
                <button className="generate-another-btn" onClick={handleGenerateAnother}>
                  Generate Another
                </button>

                {/* Review form */}
                <div className="review-section">
                  <h3>Rate your generated image</h3>
                  {reviewSubmitted ? (
                    <p>Thanks for your feedback!</p>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="review-form">
                      <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            onClick={() => setRating(star)}
                            className={`star ${star <= rating ? "filled" : ""}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <textarea
                        placeholder="Leave a short review..."
                        value={reviewMessage}
                        onChange={(e) => setReviewMessage(e.target.value)}
                      />
                      <button type="submit" className="submit-review-btn">
                        Submit Review
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
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
