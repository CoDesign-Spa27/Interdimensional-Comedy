// utils/api.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

// Initialize the Google Generative AI model
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate a comedy script
export async function generateComedy(prompt) {
  try {
    const result = await model.generateContent(`Create a short comedy script based on the following prompt: ${prompt}`);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating comedy script:', error);
    throw error;
  }
}

// Function to search for a YouTube video
export async function searchYouTube(query) {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 1,
        key: YOUTUBE_API_KEY,
      },
    });

    const video = response.data.items[0];
    return video ? { title: video.snippet.title, videoId: video.id.videoId } : null;
  } catch (error) {
    console.error('Error searching YouTube:', error);
    throw error;
  }
}