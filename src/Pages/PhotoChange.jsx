import React, { useState, useRef } from 'react';
import { Upload, Camera } from 'lucide-react';

const PhotoUpload = () => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

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
        }
    };

    const onButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Upload Photo</h2>
                    <p className="text-gray-600">Add your profile picture or any image</p>
                </div>

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
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

                {/* Upload Area */}
                <div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                        dragActive 
                            ? 'border-blue-400 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    {/* Upload Icon */}
                    <div className="mb-4">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <Upload className="w-8 h-8 text-gray-400" />
                        </div>
                    </div>

                    {/* Text */}
                    <div className="mb-4">
                        <p className="text-lg font-medium text-gray-700 mb-2">
                            Drag & drop files here
                        </p>
                        <p className="text-gray-500">
                            Or
                        </p>
                    </div>

                    {/* Upload Button */}
                    <div className='flex justify-center'>
                        <button
                        onClick={onButtonClick}
                        className="bg-[#4A90E2] text-white font-medium py-3 px-25 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2"
                    >
                        <Camera className="w-5 h-5" />
                        <span>Upload Photo</span>
                    </button>
                    </div>

                    {/* Hidden File Input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                    />
                </div>

                {/* File Info */}
                {selectedFile && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-800">
                                    {selectedFile.name}
                                </p>
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
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                        Cancel
                    </button>
                    <button 
                        className={`flex-1 font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
                            selectedFile 
                                ? 'bg-green-500 hover:bg-green-600 text-white' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!selectedFile}
                    >
                        Save Photo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhotoUpload;