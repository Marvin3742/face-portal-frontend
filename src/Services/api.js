export const generateImage = async (configs) => {
  const { selectedTime, isForward, isBackward, userImage } = configs;
  const timeValue = parseInt(selectedTime, 10);

  let ageFactor = 0;
  if (isForward) ageFactor = timeValue;
  else if (isBackward) ageFactor = -timeValue;

  const formData = new FormData();
  formData.append("file", userImage);
  formData.append("age_factor", ageFactor);

  try {
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

<<<<<<< HEAD
    const response = await fetch("https://melstiwjqunzvg-8000.proxy.runpod.net/review", {
=======
    const response = await fetch("https://iinqnrj9fx6x6k-8000.proxy.runpod.net/review", {
>>>>>>> 4b9f499 (api)
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
