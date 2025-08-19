import { useEffect, useState } from "react"
import "../css/imageCard.css"

function ImageCard({ image }) {
  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    if (!image) return

    // If movie is a File, create a temporary URL
    const src = image instanceof File ? URL.createObjectURL(image) : image
    setImageSrc(src)

    // Cleanup function: revoke URL when component unmounts or movie changes
    return () => {
      if (image instanceof File) {
        URL.revokeObjectURL(src)
      }
    }
  }, [image])

  if (!imageSrc) return null

  return (
    <div className="image-card">
      <img src={imageSrc} alt="image" />
    </div>
  )
}

export default ImageCard
