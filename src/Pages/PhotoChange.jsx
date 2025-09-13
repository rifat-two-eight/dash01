import React, { useState, useRef } from 'react';
import { Upload, Camera } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const PhotoUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const baseURL = "http://10.10.7.106:5000/api/v1";

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setError(null);
    } else {
      setError("Please select an image file.");
      Swal.fire("Error!", "Please select an image file.", "error");
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSavePhoto = async () => {
    if (!token) {
      setError("Not found. Please log in.");
      Swal.fire("Error!", "Not found. Please log in.", "error");
      navigate("/login");
      return;
    }

    if (!selectedFile) {
      setError("No file selected.");
      Swal.fire("Error!", "No file selected.", "error");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      console.log("Sending PATCH to /user/profile with image:", selectedFile.name); // Debug log
      const res = await axios.patch(
        `${baseURL}/user/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          timeout: 15000,
        }
      );

      console.log("PATCH response:", res.data); // Debug log
      if (res.data.success) {
        Swal.fire("Success!", "Profile photo updated successfully.", "success");
        setSelectedFile(null);
        setPreviewUrl(null);
        navigate("/dashboard");
      } else {
        throw new Error(res.data.message || "Failed to update profile photo");
      }
    } catch (err) {
      console.error("Error updating profile photo:", err.response?.data || err);
      const errorMessage =
        err.code === "ECONNABORTED"
          ? "Request timed out. Please check if the server is running at 10.10.7.106:5000."
          : err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")
          ? "Session expired. Please log in again."
          : err.response?.status === 403
          ? "Access denied: Admin or Super Admin privileges required. Try logging in with shakayet.dev@gmail.com."
          : err.response?.status === 404 || err.response?.data?.message?.includes("Not found")
          ? "User not found."
          : err.response?.data?.message || "Failed to update profile photo.";
      setError(errorMessage);
      Swal.fire("Error!", errorMessage, "error");
      if (err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
      } else if (err.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Upload Photo</h2>
          <p className="text-gray-600">Add your profile picture or any image</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <span className="text-red-800 text-sm">{error}</span>
          </div>
        )}

        {/* Preview Area */}
        {previewUrl && (
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
              />
              <button
                onClick={() => {
                  setPreviewUrl(null);
                  setSelectedFile(null);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                disabled={loading}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="mb-4">
            <p className="text-lg font-medium text-gray-700 mb-2">Drag & drop files here</p>
            <p className="text-gray-500">Or</p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={onButtonClick}
              className="bg-[#4A90E2] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2"
              disabled={loading}
            >
              <Camera className="w-5 h-5" />
              <span>Upload Photo</span>
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            disabled={loading}
          />
        </div>

        {/* File Info */}
        {selectedFile && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">{selectedFile.name}</p>
                <p className="text-xs text-green-600">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <div className="text-green-500">
                <Upload className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {/* Additional Actions */}
        <div className="mt-6 flex space-x-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSavePhoto}
            className={`flex-1 font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
              selectedFile && !loading
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!selectedFile || loading}
          >
            {loading ? "Saving..." : "Save Photo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;