import React, { useState } from 'react';
import { CheckCircle, Save } from 'lucide-react';

const Terms = () => {
    const [termsContent, setTermsContent] = useState('');
    const [lastUpdated, setLastUpdated] = useState('January 15, 2024');
    const [showSuccessMessage, setShowSuccessMessage] = useState(true);

    const handleSaveTerms = () => {
        setLastUpdated(new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }));
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 5000);
    };

    return (
        <div className="space-y-6 ms-16">
            {/* Section Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Manage Terms & Conditions
                </h2>
                <p className="text-gray-600">
                    Use this section to write or update the Terms and Conditions for your app. These terms will be displayed to users within the app and must be accepted during registration or major updates.
                </p>
            </div>

            {/* Success Message */}
            {showSuccessMessage && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 text-sm">
                        Your Terms & Conditions have been successfully updated and will now appear in the app.
                    </span>
                </div>
            )}

            {/* Editor Section */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                <div className="border-b border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">
                        Terms & Conditions Editor
                    </h3>
                </div>
                
                <div className="p-6">
                    <textarea
                        value={termsContent}
                        onChange={(e) => setTermsContent(e.target.value)}
                        placeholder="Write or paste your Terms & Conditions here..."
                        className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                    />
                </div>
            </div>

            {/* Footer with Last Updated and Save Button */}
            <div className="flex items-start justify-start flex-col space-y-4">
                <div className="text-sm text-gray-500">
                    Last Updated On: <span className="font-medium">{lastUpdated}</span>
                </div>
                
                <button
                    onClick={handleSaveTerms}
                    className="bg-[#4383CE] text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                    <Save className="w-4 h-4" />
                    <span>Save Terms & Conditions</span>
                </button>
            </div>
        </div>
    );
};

export default Terms;