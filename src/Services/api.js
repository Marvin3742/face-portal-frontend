import generatedImageFile from "../Images/generatedImage.jpeg"

export const generateImage = async (configs) => {
    const {selectedTime, isForward, isBackward} = configs
    return generatedImageFile
};