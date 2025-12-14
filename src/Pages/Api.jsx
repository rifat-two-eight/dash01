import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Listbox } from "@headlessui/react";
import axios from "axios";
import Swal from "sweetalert2";

const sites = ["Amazon", "Ebay", "Alibaba", "Zalando", "leroy_merlin"];
const environments = ["Sandbox", "Production"];

const Api = () => {
  const baseURL = "https://api.yespend.com/api/v1";
  const token = localStorage.getItem("token");

  // Active Search Button State
  const [activeSearch, setActiveSearch] = useState(null);

  // Submit API States
  const [submitSelectedSite, setSubmitSelectedSite] = useState("");
  const [submitSelectedEnvironment, setSubmitSelectedEnvironment] =
    useState("");

  // Test API States
  const [testSelectedSite, setTestSelectedSite] = useState("");
  const [testSelectedEnvironment, setTestSelectedEnvironment] = useState("");

  // GENERIC / API BASE SEARCH POST CALL
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

      // Activate Selected Button
      setActiveSearch(type);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `${type === "GENERIC" ? "Generic" : "API Base"} Search activated`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire(
        "Failed",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

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
              <Listbox
                value={submitSelectedSite}
                onChange={setSubmitSelectedSite}
              >
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
              <Listbox
                value={submitSelectedEnvironment}
                onChange={setSubmitSelectedEnvironment}
              >
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

            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>

            <input
              type="text"
              placeholder="Please enter country"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />

            <label className="block text-sm font-medium text-gray-700">
              Region
            </label>
            <input
              type="text"
              placeholder="Please enter region"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />
          </div>

          <div className="flex justify-center">
            <button onClick={handleSubmitAPI} className={buttonClass}>
              Submit API
            </button>
          </div>

          {/* Test API Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Marketplace Name <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <Listbox
                value={testSelectedSite}
                onChange={setTestSelectedSite}
              >
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
              <Listbox
                value={testSelectedEnvironment}
                onChange={setTestSelectedEnvironment}
              >
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
            
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              placeholder="Please enter country"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />

            <label className="block text-sm font-medium text-gray-700">
              Region
            </label>
            <input
              type="text"
              placeholder="Please enter region"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]"
            />
          </div>

          <div className="flex justify-center">
            <button onClick={handleTestAPI} className={buttonClass}>
              Test API
            </button>
          </div>

          {/* Search Buttons Section (Updated Active/Inactive) */}
          <div className="flex justify-center pt-4">
            <div className="flex w-[390px] h-[99px] rounded-xl overflow-hidden shadow-sm">
              
              {/* GENERIC BUTTON */}
              <button
                onClick={() => handleSearchType("GENERIC")}
                className={`flex-1 font-medium py-6 px-6 transition-colors duration-200 ${
                  activeSearch === "GENERIC"
                    ? "bg-[#4A90E2] text-white"
                    : "bg-white text-[#4A90E2] border-r border-[#4A90E2]"
                }`}
              >
                Generic Search
              </button>

              {/* API BASE BUTTON */}
              <button
                onClick={() => handleSearchType("API")}
                className={`flex-1 font-medium py-6 px-6 transition-colors duration-200 ${
                  activeSearch === "API"
                    ? "bg-[#4A90E2] text-white"
                    : "bg-white text-[#4A90E2]"
                }`}
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
