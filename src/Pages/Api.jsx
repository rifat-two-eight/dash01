import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Api = () => {
  const [selectedSite, setSelectedSite] = useState('');
  const [apiKeyTest, setApiKeyTest] = useState('');
  const [selectedApiKeyPost, setSelectedApiKeyPost] = useState('');
  const [apiKeyTestPost, setApiKeyTestPost] = useState('');

  const handleSubmitAPI = () => {
    console.log('Submit API clicked');
  };

  const handleTestAPI = () => {
    console.log('Test API clicked');
  };

  const handleGenericSearch = () => {
    console.log('Generic Search clicked');
  };

  const handleAPIBaseSearch = () => {
    console.log('API Base Search clicked');
  };

  const buttonClass =
    "w-[320px] bg-[#4A90E2] cursor-pointer text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200";

  return (
    <div className="space-y-6 flex justify-center items-center mt-5">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-sm p-8">
        <div className="space-y-8">
          {/* Select Site Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Site
            </label>
            <div className="relative">
              <select
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg  bg-white text-gray-700 appearance-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2] focus:outline-none "
              >
                <option value="">Please select</option>
                <option value="site1">Ebay</option>
                <option value="site2">Amazon</option>
                <option value="site3">Temu</option>
                <option value="site3">Subito</option>
                <option value="site3">Alibaba</option>
                <option value="site3">Zalando</option>
                <option value="site3">Mediaworld</option>
                <option value="site3">Notino</option>
                <option value="site3">Douglas</option>
                <option value="site3">LeroyMerlin</option>
                <option value="site3">BackMarket</option>
                <option value="site3">Swappie</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Api Key Test Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Api Key Test
            </label>
            <input
              type="text"
              value={apiKeyTest}
              onChange={(e) => setApiKeyTest(e.target.value)}
              placeholder="Please enter api key post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />
            <div className="flex justify-center">
              <button onClick={handleSubmitAPI} className={buttonClass}>
                Submit API
              </button>
            </div>
          </div>

          {/* Api Key Post Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Api Key Post
            </label>
            <div className="relative">
              <select
                value={selectedApiKeyPost}
                onChange={(e) => setSelectedApiKeyPost(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
              >
                <option value="">Please select</option>
                <option value="post1">Post 1</option>
                <option value="post2">Post 2</option>
                <option value="post3">Post 3</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Api Key Test (Second) Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Api Key Test
            </label>
            <input
              type="text"
              value={apiKeyTestPost}
              onChange={(e) => setApiKeyTestPost(e.target.value)}
              placeholder="Please enter api key Test"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />
            <div className="flex justify-center">
              <button onClick={handleTestAPI} className={buttonClass}>
                Test API
              </button>
            </div>
          </div>

          {/* Search Buttons Section (two block style) */}
          <div className="flex justify-center pt-4">
            <div className="flex w-[390px] h-[99px]  rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={handleGenericSearch}
                className="flex-1 bg-[#4A90E2] text-white font-medium py-6 px-6 transition-colors duration-200"
              >
                Generic Search
              </button>
              <button
                onClick={handleAPIBaseSearch}
                className="flex-1 bg-white text-[#4A90E2] font-medium py-6 px-6 transition-colors duration-200"
              >
                API Base Search
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Api;
