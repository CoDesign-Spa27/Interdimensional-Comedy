"use client"
import { useState } from 'react';
import Layout from '../../components/Layout';
import VideoGenerator from '../../components/VideoGenerator';

export default function Home() {
  const [activeTab, setActiveTab] = useState('comedy');

  return (
    <Layout>
      <div className="flex space-x-4 mb-6">
        <button
          className={`p-2 rounded-md focus:outline-none ${
            activeTab === 'comedy' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => setActiveTab('comedy')}
        >
          Comedy Videos
        </button>
        <button
          className={`p-2 rounded-md focus:outline-none ${
            activeTab === 'music' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => setActiveTab('music')}
        >
          Music Videos
        </button>
      </div>
      <div className="p-4 border border-gray-300 rounded-md shadow-sm">
        {activeTab === 'comedy' && <VideoGenerator type="comedy" />}
        {activeTab === 'music' && <VideoGenerator type="music" />}
      </div>
    </Layout>
  );
}
