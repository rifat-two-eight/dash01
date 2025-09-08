import React, { useState, useEffect } from "react";
import { CheckCircle, Save, AlertCircle, Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const Terms = () => {
  const [termsContent, setTermsContent] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [allTerms, setAllTerms] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingTermId, setEditingTermId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch all terms
  useEffect(() => {
    const fetchTerms = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://10.10.7.106:5000/api/v1/terms-conditions",
          {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 15000,
          }
        );

        if (res.data.success) {
          const sortedTerms = [...res.data.data].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setAllTerms(sortedTerms);
          setTermsContent("");
          setLastUpdated(
            sortedTerms[0]?.updatedAt
              ? new Date(sortedTerms[0].updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""
          );
          setEditingTermId(null);
          setError(null);
        } else {
          setAllTerms([]);
          setTermsContent("");
          setLastUpdated("");
          setError("No Terms & Conditions found. Create a new version to start.");
        }
      } catch (err) {
        console.error("Error fetching terms:", err.response?.data || err);
        if (err.code === "ECONNABORTED") {
          setError("Request timed out. Please check if the server is running at 10.10.7.106:5000.");
        } else if (err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else if (err.response?.status === 403) {
          setError("Access denied: Super Admin privileges required. Try logging in with shakayet.dev@gmail.com.");
          navigate("/login");
        } else if (err.response?.status === 404 || err.response?.data?.message?.includes("Not found")) {
          setError("No Terms & Conditions found. Create a new version to start.");
        } else {
          setError(err.response?.data?.message || "Failed to load Terms & Conditions.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchTerms();
    else {
      setError("No authentication token found. Please log in.");
      navigate("/login");
    }
  }, [token, navigate]);

  // Save or update terms
  const handleSaveTerms = async (isModal = false, contentToSave = termsContent) => {
    if (!contentToSave.trim()) {
      setError("Terms content cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      let res;
      if (isModal && editingTermId) {
        // Update using PATCH
        res = await axios.patch(
          `http://10.10.7.106:5000/api/v1/terms-conditions/${editingTermId}`,
          { content: contentToSave },
          {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 15000,
          }
        );
      } else {
        // Create
        res = await axios.post(
          "http://10.10.7.106:5000/api/v1/terms-conditions",
          {
            content: contentToSave,
            version: `v${(allTerms[0]?.version ? parseFloat(allTerms[0].version.slice(1)) + 0.1 : 1.0).toFixed(1)}`,
            effectiveDate: new Date().toISOString(),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 15000,
          }
        );
      }

      if (res.data.success) {
        // Refresh list
        const refreshRes = await axios.get(
          "http://10.10.7.106:5000/api/v1/terms-conditions",
          {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 15000,
          }
        );
        if (refreshRes.data.success) {
          const sortedTerms = [...refreshRes.data.data].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setAllTerms(sortedTerms);
          setTermsContent(isModal ? termsContent : ""); // Clear input only for POST
          setLastUpdated(
            sortedTerms[0]?.updatedAt
              ? new Date(sortedTerms[0].updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""
          );
          setEditingTermId(null);
          setModalOpen(false);
          setModalContent("");
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 5000);
          if (isModal) {
            Swal.fire("Success!", "Terms & Conditions updated successfully.", "success");
          }
        }
      }
    } catch (err) {
      console.error("Error saving terms:", err.response?.data || err);
      const errorMessage =
        err.code === "ECONNABORTED"
          ? "Request timed out. Please check if the server is running at 10.10.7.106:5000."
          : err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")
          ? "Session expired. Please log in again."
          : err.response?.status === 403
          ? "Access denied: Super Admin privileges required. Try logging in with shakayet.dev@gmail.com."
          : err.response?.status === 404 || err.response?.data?.message?.includes("Not found")
          ? "Failed to save: Term not found. Please refresh and try again."
          : err.response?.data?.message || "Failed to save Terms & Conditions.";
      setError(errorMessage);
      if (isModal) {
        Swal.fire("Error!", errorMessage, "error");
      }
      if (err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")) {
        localStorage.removeItem("token");
        navigate("/login");
      } else if (err.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete term with SweetAlert2
  const handleDeleteTerm = async (termId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this term?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    setError(null);
    try {
      const res = await axios.delete(
        `http://10.10.7.106:5000/api/v1/terms-conditions/${termId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 15000,
        }
      );

      if (res.data.success) {
        // Refresh list
        const refreshRes = await axios.get(
          "http://10.10.7.106:5000/api/v1/terms-conditions",
          {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 15000,
          }
        );
        if (refreshRes.data.success) {
          const sortedTerms = [...refreshRes.data.data].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setAllTerms(sortedTerms);
          setTermsContent("");
          setLastUpdated(
            sortedTerms[0]?.updatedAt
              ? new Date(sortedTerms[0].updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""
          );
          setEditingTermId(null);
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 5000);
          Swal.fire("Deleted!", "The term has been deleted.", "success");
        }
      }
    } catch (err) {
      console.error("Error deleting term:", err.response?.data || err);
      const errorMessage =
        err.code === "ECONNABORTED"
          ? "Request timed out. Please check if the server is running at 10.10.7.106:5000."
          : err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")
          ? "Session expired. Please log in again."
          : err.response?.status === 403
          ? "Access denied: Super Admin privileges required. Try logging in with shakayet.dev@gmail.com."
          : err.response?.status === 404 || err.response?.data?.message?.includes("Not found")
          ? "Failed to delete: Term not found. Please refresh and try again."
          : err.response?.data?.message || "Failed to delete term.";
      setError(errorMessage);
      Swal.fire("Error!", errorMessage, "error");
      if (err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")) {
        localStorage.removeItem("token");
        navigate("/login");
      } else if (err.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Edit term (open modal)
  const handleEditTerm = (term) => {
    setModalContent(term.content || "");
    setEditingTermId(term._id);
    setModalOpen(true);
    setError(null);
  };

  // Handle modal save
  const handleModalSave = () => {
    if (!modalContent.trim()) {
      setError("Terms content cannot be empty.");
      Swal.fire("Error!", "Terms content cannot be empty.", "error");
      return;
    }
    if (!editingTermId) {
      setError("No term selected for update.");
      Swal.fire("Error!", "No term selected for update.", "error");
      return;
    }
    handleSaveTerms(true, modalContent);
  };

  return (
    <div className="space-y-6 ms-16">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Manage Terms & Conditions
        </h2>
        <p className="text-gray-600">
          Use this section to write, update, or delete Terms & Conditions for
          your app.
        </p>
      </div>

      {/* Success / Error Messages */}
      {showSuccessMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800 text-sm">
            ✅ Your Terms & Conditions have been successfully updated.
          </span>
        </div>
      )}
      {error && (
        <div className="mb-6 bg-red-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800 text-sm">{error}</span>
        </div>
      )}

      {/* Previous Terms */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Previous Terms & Conditions
        </h3>
        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
          {loading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : allTerms.length > 0 ? (
            allTerms.map((term) => (
              <div
                key={term._id}
                className="p-3 border-b border-gray-200 last:border-0 flex justify-between items-start"
              >
                <div>
                  <p className="text-sm text-gray-800">{term.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Updated on:{" "}
                    {new Date(term.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditTerm(term)}
                    className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                    disabled={loading}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTerm(term._id)}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No terms available yet.</p>
          )}
        </div>
      </div>

      {/* Editor */}
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
            className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm disabled:opacity-50"
            disabled={loading}
          />
        </div>
      </div>

      {/* Modal for Editing */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Edit Terms & Conditions
            </h3>
            <textarea
              value={modalContent}
              onChange={(e) => setModalContent(e.target.value)}
              placeholder="Edit your Terms & Conditions here..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm disabled:opacity-50"
              disabled={loading}
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setModalContent("");
                  setEditingTermId(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleModalSave}
                className="px-4 py-2 text-sm font-medium text-white bg-[#4383CE] rounded-lg hover:bg-blue-600 disabled:opacity-50"
                disabled={loading || !modalContent.trim()}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-start justify-start flex-col space-y-4">
        <div className="text-sm text-gray-500">
          Last Updated On: <span className="font-medium">{lastUpdated}</span>
        </div>
        <button
          onClick={() => handleSaveTerms(false, termsContent)}
          className="bg-[#4383CE] text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !termsContent.trim()}
        >
          <Save className="w-4 h-4" />
          <span>{loading ? "Saving..." : "Save Terms & Conditions"}</span>
        </button>
      </div>
    </div>
  );
};

export default Terms;