import generatedImageFile from "../Images/generatedImage.jpeg"

export const generateImage = async (configs) => {
    const {selectedTime, isForward, isBackward} = configs
    const response = await fetch("http://127.0.0.1:8000/generate")
    const blob = await response.blob()
    const imageUrl = URL.createObjectURL(blob)
    return imageUrl
};