import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Listbox } from "@headlessui/react";
import axios from "axios";
import Swal from "sweetalert2";

const sites = [
  "Amazon",
  "Ebay",
  "Alibaba",
  "Zalando",
  "leroy_merlin",
];

const environments = ["Sandbox", "Production"];

const Api = () => {
  const baseURL = "http://10.10.7.106:5001/api/v1";
  const token = localStorage.getItem("token");

  // Submit API Section
  const [submitSelectedSite, setSubmitSelectedSite] = useState("");
  const [submitSelectedEnvironment, setSubmitSelectedEnvironment] = useState("");

  // Test API Section
  const [testSelectedSite, setTestSelectedSite] = useState("");
  const [testSelectedEnvironment, setTestSelectedEnvironment] = useState("");

  // এই ফাংশন Generic বা API চাপলে কল হবে
  const handleSearchType = async (type) => {
    if (!token) {
      Swal.fire("Error", "Please login first!", "error");
      return;
    }

    try {
      await axios.post(
        `${baseURL}/marketplace/searchType`,
        { type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `${type === "GENERIC" ? "Generic" : "API Base"} Search activated`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire("Failed", err.response?.data?.message || "Something went wrong", "error");
    }
  };

  const handleGenericSearch = () => handleSearchType("GENERIC");
  const handleAPIBaseSearch = () => handleSearchType("API");

  const handleTestAPI = () => {
    console.log("Test API clicked");
  };

  const handleSubmitAPI = () => {
    console.log("Submit API clicked");
  };

  const buttonClass =
    "w-[320px] bg-[#4A90E2] cursor-pointer text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200";

  return (
    <div className="space-y-6 flex justify-center items-center mt-5">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-sm p-8">
        <div className="space-y-8">
          {/* Submit API Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Marketplace Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Listbox value={submitSelectedSite} onChange={setSubmitSelectedSite}>
                <div className="relative">
                  <Listbox.Button className="w-full border border-gray-300 rounded-lg px-4 py-3 flex justify-between items-center">
                    {submitSelectedSite || "Please select"}
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

            <label className="block text-sm font-medium text-gray-700">
              Client Id <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Please enter api key Post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />

            <label className="block text-sm font-medium text-gray-700">
              Client Secret <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Please enter api key Post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />

            <label className="block text-sm font-medium text-gray-700">
              Refresh Token
            </label>
            <input
              type="text"
              placeholder="Please enter api key Post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />

            <label className="block text-sm font-medium text-gray-700">
              AWS Access Key ID
            </label>
            <input
              type="text"
              placeholder="Please enter api key Post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />

            <label className="block text-sm font-medium text-gray-700">
              AWS Secret Access Key
            </label>
            <input
              type="text"
              placeholder="Please enter api key Post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />

            <label className="block text-sm font-medium text-gray-700">
              Marketplace Id
            </label>
            <input
              type="text"
              placeholder="Please enter api key Post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />

            <label className="block text-sm font-medium text-gray-700">
              Environment
            </label>
            <div className="relative">
              <Listbox value={submitSelectedEnvironment} onChange={setSubmitSelectedEnvironment}>
                <div className="relative">
                  <Listbox.Button className="w-full border border-gray-300 rounded-lg px-4 py-3 flex justify-between items-center">
                    {submitSelectedEnvironment || "Please select"}
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {environments.map((environment, index) => (
                      <Listbox.Option
                        key={index}
                        value={environment}
                        className="cursor-pointer px-4 py-3 border-t border-gray-300 last:border-b hover:bg-[#4A90E2] hover:text-white"
                      >
                        {environment}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>

          <div className="flex justify-center">
            <button onClick={handleSubmitAPI} className={buttonClass}>
              Submit API
            </button>
          </div>

          {/* Test API Section - ঠিক তোমার আগের মতোই */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Marketplace Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Listbox value={testSelectedSite} onChange={setTestSelectedSite}>
                <div className="relative">
                  <Listbox.Button className="w-full border border-gray-300 rounded-lg px-4 py-3 flex justify-between items-center">
                    {testSelectedSite || "Please select"}
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

            {/* বাকি ইনপুটগুলো একদম আগের মতোই */}
            <label className="block text-sm font-medium text-gray-700">
              Client Id <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Please enter api key Post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />

            <label className="block text-sm font-medium text-gray-700">
              Client Secret <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Please enter api key Post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />

            <label className="block text-sm font-medium text-gray-700">
              Refresh Token
            </label>
            <input
              type="text"
              placeholder="Please enter api key Post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />

            <label className="block text-sm font-medium text-gray-700">
              AWS Access Key ID
            </label>
            <input
              type="text"
              placeholder="Please enter api key Post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />

            <label className="block text-sm font-medium text-gray-700">
              AWS Secret Access Key
            </label>
            <input
              type="text"
              placeholder="Please enter api key Post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />

            <label className="block text-sm font-medium text-gray-700">
              Marketplace Id
            </label>
            <input
              type="text"
              placeholder="Please enter api key Post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />

            <label className="block text-sm font-medium text-gray-700">
              Environment
            </label>
            <div className="relative">
              <Listbox value={testSelectedEnvironment} onChange={setTestSelectedEnvironment}>
                <div className="relative">
                  <Listbox.Button className="w-full border border-gray-300 rounded-lg px-4 py-3 flex justify-between items-center">
                    {testSelectedEnvironment || "Please select"}
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {environments.map((environment, index) => (
                      <Listbox.Option
                        key={index}
                        value={environment}
                        className="cursor-pointer px-4 py-3 border-t border-gray-300 last:border-b hover:bg-[#4A90E2] hover:text-white"
                      >
                        {environment}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>

          <div className="flex justify-center">
            <button onClick={handleTestAPI} className={buttonClass}>
              Test API
            </button>
          </div>

          {/* Search Buttons Section - এখানে API কল হবে */}
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