"use client";
import { useState } from 'react';
import { generateComedy, searchYouTube } from '../utils/api';

const VideoGenerator = ({ type }) => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const generatedScript = await generateComedy(prompt);
      setResult(generatedScript);

      const youtubeVideo = await searchYouTube(`${type} ${prompt}`);
      setVideo(youtubeVideo);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while generating content or searching for a video.');
    }
    setIsLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl text-black mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Enter a prompt for your ${type} video idea`}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className={`p-2 bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 ${isLoading ? 'cursor-wait' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : `Generate ${type.charAt(0).toUpperCase() + type.slice(1)} Video`}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {result && (
        <div className="mt-4 h-56 p-4 border border-gray-300 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold">Generated Idea:</h3>
          <textarea
            value={result}
            readOnly
            className="w-full mt-2 p-2 h-40 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
      )}
      {video && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold">Related YouTube Video:</h3>
          <p className="mt-2">{video.title}</p>
          <iframe
            className="w-full mt-2"
            height="315"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoGenerator;
