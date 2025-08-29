const axios = require('axios');

// Using the faster model you selected
const API_URL = 'https://api-inference.huggingface.co/models/valhalla/distilbart-mnli-12-3';

const analyzeText = async (text) => {
  if (!process.env.HF_API_KEY) {
    throw new Error("HuggingFace API Key not found in environment variables.");
  }
  
  console.log("Calling Hugging Face API with text:", text);

  const candidate_labels = ["fake news", "real news"];

  try {
    const response = await axios.post(
      API_URL,
      {
        inputs: text,
        parameters: {
          candidate_labels: ["fake news", "real news"],
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HF_API_KEY}`
        },
      }
    );

    if (!response.data) {
      throw new Error("Received an invalid response from HuggingFace.");
    }

    console.log("API raw response:", response.data);

     const scores = response.data.scores;
    
    // Find the highest score and its index
    let maxScore = 0;
    let maxIndex = 0;
    scores.forEach((score, index) => {
      if (score > maxScore) {
        maxScore = score;
        maxIndex = index;
      }
    });

    const result = {
      type: candidate_labels[maxIndex], // Use the index to find the correct label
      confidence: maxScore             // The confidence is the highest score
    };

    return result;

  } catch (error) {
    if (error.response) {
      console.error("Error Status:", error.response.status);
      console.error("Error Data:", error.response.data);
    } else {
      console.error('Error Message:', error.message);
    }
    throw new Error("HuggingFace API request failed.");
  }
};

module.exports =  analyzeText ;