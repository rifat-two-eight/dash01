import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Listbox } from "@headlessui/react";

const sites = [
  "Ebay",
  "Amazon",
  "Temu",
  "Subito",
  "Alibaba",
  "Zalando",
  "Mediaworld",
  "Notino",
  "Douglas",
  "LeroyMerlin",
  "BackMarket",
  "Swappie",
];

const apiPosts = ["Post 1", "Post 2", "Post 3"];

const Api = () => {
  const [selectedSite, setSelectedSite] = useState("");
  const [apiKeyTest, setApiKeyTest] = useState("");
  const [selectedApiKeyPost, setSelectedApiKeyPost] = useState("");
  const [apiKeyTestPost, setApiKeyTestPost] = useState("");

  const handleSubmitAPI = () => {
    console.log("Submit API clicked");
  };

  const handleTestAPI = () => {
    console.log("Test API clicked");
  };

  const handleGenericSearch = () => {
    console.log("Generic Search clicked");
  };

  const handleAPIBaseSearch = () => {
    console.log("API Base Search clicked");
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
              <Listbox value={selectedSite} onChange={setSelectedSite}>
                <div className="relative">
                  <Listbox.Button className="w-full border border-gray-300 rounded-lg px-4 py-3 flex justify-between items-center">
                    {selectedSite || "Please select"}
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {sites.map((site, idx) => (
                      <Listbox.Option
                        key={idx}
                        value={site}
                        className="cursor-pointer px-4 py-3 border-t border-gray-300 last:border-b hover:bg-[#4A90E2] hover:text-white"
                      >
                        {site}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
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
              <Listbox value={selectedApiKeyPost} onChange={setSelectedApiKeyPost}>
                <div className="relative">
                  <Listbox.Button className="w-full border border-gray-300 rounded-lg px-4 py-3 flex justify-between items-center">
                    {selectedApiKeyPost || "Please select"}
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {apiPosts.map((post, idx) => (
                      <Listbox.Option
                        key={idx}
                        value={post}
                        className="cursor-pointer px-4 py-3 border-t border-gray-300 last:border-b hover:bg-[#4A90E2] hover:text-white"
                      >
                        {post}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
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
            <div className="flex w-[390px] h-[99px] rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={handleGenericSearch}
                className="flex-1 bg-[#4A90E2] text-white font-medium py-6 px-6 transition-colors duration-200"
              >
                Generic Search
              </button>
              <button
                onClick={handleAPIBaseSearch}
                className="flex-1 bg-white text-[#4A90E2] font-medium py-6 px-6 transition-colors duration-200 border-l border-[#4A90E2]"
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