import imageCompression from 'browser-image-compression';

export const generateImage = async (configs) => {
  const { selectedTime, isForward, isBackward, userImage } = configs;
  const timeValue = parseInt(selectedTime, 10);

  let ageFactor = 0;
  if (isForward) ageFactor = timeValue;
  else if (isBackward) ageFactor = -timeValue;

  const options = {
    maxSizeMB: 0.4,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };


  try {
    //console.log(`Original file size: ${(userImage.size / 1024 / 1024).toFixed(2)} MB`);
    const compressedFile = await imageCompression(userImage, options);
    //console.log(`Compressed file size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);

    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("age_factor", ageFactor);

    const response = await fetch("https://iinqnrj9fx6x6k-8000.proxy.runpod.net/generate", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      let errorMsg = `Server error: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMsg = errorData.message;
        }
      } catch {
        
      }
      throw new Error(errorMsg);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;

  } catch (error) {
    console.error("Error generating image:", error);
    throw error; 
  }
};


export const submitReview = async (rating, message) => {
  try {
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("message", message);

    const response = await fetch("https://iinqnrj9fx6x6k-8000.proxy.runpod.net/review", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to send review");
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};
