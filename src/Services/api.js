export const generateImage = async (configs) => {
  const { selectedTime, isForward, isBackward, userImage } = configs;

  // Ensure it's an integer
  const timeValue = parseInt(selectedTime, 10);

  // Decide direction — example logic, adjust if needed
  let ageFactor = 0;
  if (isForward) ageFactor = timeValue;
  else if (isBackward) ageFactor = -timeValue;

  // Prepare FormData
  const formData = new FormData();
  formData.append("file", userImage);        // File object
  formData.append("age_factor", ageFactor);  // Integer value

  try {
    const response = await fetch("http://localhost:8000/generate", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    // Get the image blob back from FastAPI
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
