import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { AlertCircle, CheckCircle } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Feedback = () => {
  const [analytics, setAnalytics] = useState({
    totalReviews: 0,
    averageRating: 0,
    stats: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    recent: [],
  });
  const [reviews, setReviews] = useState([]); // For Feedback Table
  const [users, setUsers] = useState({}); // Map userId to { name, image }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("date"); // Default sort by date
  const [search, setSearch] = useState("");
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(3); // Initially show 3 pending reviews
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const baseURL = "http://10.10.7.106:5000/api/v1";
  const defaultImage = "https://i.postimg.cc/3xBtfyJ5/Ellipse-1.png";
  const initialPageSize = 3;
  const pageSizeIncrement = 5;

  // Fetch analytics and reviews
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch analytics for metrics and recent ratings
      const analyticsRes = await axios.get(`${baseURL}/review/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000,
      });

      if (!analyticsRes.data.success) {
        throw new Error(analyticsRes.data.message || "Failed to load analytics");
      }

      // Fetch reviews for Feedback Table
      const reviewsRes = await axios.get(`${baseURL}/review`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000,
      });

      if (!reviewsRes.data.success) {
        throw new Error(reviewsRes.data.message || "Failed to load reviews");
      }

      // Fetch user names and images
      const userIds = [
        ...new Set([
          ...analyticsRes.data.recent.map((r) => r.user),
          ...reviewsRes.data.data.map((r) => r.user),
        ]),
      ];
      const userPromises = userIds.map((userId) =>
        axios
          .get(`${baseURL}/user/admin/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 15000,
          })
          .then((res) => {
            console.log(`User ${userId} response:`, res.data); // Debug log
            return {
              userId,
              name: res.data.success ? res.data.data.name : "Unknown",
              image: res.data.success && res.data.data.image ? `http://10.10.7.106:5000${res.data.data.image}` : defaultImage,
            };
          })
          .catch((err) => {
            console.error(`Error fetching user ${userId}:`, err.response?.data || err); // Debug log
            return { userId, name: "Unknown", image: defaultImage };
          })
      );
      const userData = await Promise.all(userPromises);
      const userMap = Object.fromEntries(
        userData.map(({ userId, name, image }) => [userId, { name, image }])
      );

      setAnalytics(analyticsRes.data);
      setReviews(reviewsRes.data.data);
      setUsers(userMap);
      setVisibleReviewsCount(initialPageSize);
    } catch (err) {
      console.error("Error fetching data:", err.response?.data || err);
      const errorMessage =
        err.code === "ECONNABORTED"
          ? "Request timed out. Please check if the server is running at 10.10.7.106:5000."
          : err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")
          ? "Session expired. Please log in again."
          : err.response?.status === 403
          ? "Access denied: Admin or Super Admin privileges required. Try logging in with shakayet.dev@gmail.com."
          : err.response?.status === 404 || err.response?.data?.message?.includes("Not found")
          ? "Data not found. Please check the backend API."
          : err.response?.data?.message || "Failed to load data.";
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

  // Resolve review
  const handleResolveReview = async (reviewId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Mark this review as resolved?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, resolve it!",
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    setError(null);
    try {
      const res = await axios.patch(
        `${baseURL}/review/admin/review/${reviewId}`,
        { status: "resolved" },
        { headers: { Authorization: `Bearer ${token}` }, timeout: 15000 }
      );

      if (res.data.success) {
        Swal.fire("Success!", "Review marked as resolved.", "success");
        setReviews((prev) =>
          prev.map((review) =>
            review._id === reviewId ? { ...review, status: "resolved" } : review
          )
        );
      }
    } catch (err) {
      console.error("Error resolving review:", err.response?.data || err);
      const errorMessage =
        err.code === "ECONNABORTED"
          ? "Request timed out. Please check if the server is running at 10.10.7.106:5000."
          : err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")
          ? "Session expired. Please log in again."
          : err.response?.status === 403
          ? "Access denied: Admin or Super Admin privileges required. Try logging in with shakayet.dev@gmail.com."
          : err.response?.status === 404 || err.response?.data?.message?.includes("Not found")
          ? "Review not found."
          : err.response?.data?.message || "Failed to resolve review.";
      setError(errorMessage);
      Swal.fire("Error!", errorMessage, "error");
      if (err.response?.status === 401 || err.response?.data?.message?.includes("Session Expired")) {
        localStorage.removeItem("token");
        navigate("/login");
      } else if (err.response?.status === 403) {
        navigate("//login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle See More
  const handleSeeMore = () => {
    setVisibleReviewsCount((prev) => prev + pageSizeIncrement);
  };

  // Handle See Less
  const handleSeeLess = () => {
    setVisibleReviewsCount(initialPageSize);
  };

  // Fetch data on mount
  useEffect(() => {
    if (token) fetchData();
    else {
      setError("No authentication token found. Please log in.");
      Swal.fire("Error!", "No authentication token found. Please log in.", "error");
      navigate("/login");
    }
  }, [token, navigate]);

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    percentage: analytics.totalReviews ? ((analytics.stats[stars] || 0) / analytics.totalReviews) * 100 : 0,
  }));

  // Normalize percentages to ensure sum is exactly 100%
  const totalPercentage = ratingDistribution.reduce((sum, r) => sum + r.percentage, 0);
  const normalizedDistribution = ratingDistribution.map((rating) => ({
    ...rating,
    percentage: totalPercentage > 0 ? (rating.percentage / totalPercentage) * 100 : 0,
  }));

  // Filter and sort reviews for Feedback Table
  const filteredReviews = reviews
    .filter((review) => {
      const userName = users[review.user]?.name || "Unknown";
      return (
        userName.toLowerCase().includes(search.toLowerCase()) ||
        review.comment.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (a.status !== b.status) {
        return a.status === "pending" ? -1 : 1;
      }
      if (sortBy === "id") return a._id?.localeCompare(b._id || "") || 0;
      if (sortBy === "name") return (users[a.user]?.name || "Unknown").localeCompare(users[b.user]?.name || "Unknown");
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  // Slice reviews for pagination
  const visibleReviews = filteredReviews.slice(0, visibleReviewsCount);

  // Calculate pending reviews
  const pendingReviews = reviews.filter((r) => r.status === "pending").length;

  // Render stars
  const renderStars = (rating) => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <img
          key={star}
          src={star <= rating ? "/yellow-star.svg" : "/white-star.svg"}
          alt="star"
          className="w-6 h-6"
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6 ms-16">
      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800 text-sm">{error}</span>
          <button
            onClick={fetchData}
            className="ml-4 px-3 py-1 text-sm font-medium text-white bg-[#4383CE] rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-[#4383CE]"
            disabled={loading}
          >
            Retry
          </button>
        </div>
      )}

      {/* Metrics Cards */}
      {loading ? (
        <div className="text-center py-10 text-gray-600">Loading...</div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <img className="bg-[#4383CE] rounded-full p-2" src="/email.svg" alt="email" />
              <span className="text-xl text-gray-700">Total Messages</span>
            </div>
            <h2 className="text-4xl text-[#454B60] flex justify-end font-semibold">
              {analytics.totalReviews}
            </h2>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <img src="/yellow-star.svg" alt="star" className="w-10 h-10" />
              <span className="text-xl text-gray-700">Average Rating</span>
            </div>
            <h2 className="text-4xl text-[#454B60] flex justify-end font-semibold">
              {analytics.averageRating.toFixed(1)}
            </h2>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <img className="bg-[#4383CE] rounded-full p-2" src="/user3.svg" alt="user" />
              <span className="text-xl text-gray-700">Pending Reviews</span>
            </div>
            <h2 className="text-4xl text-[#454B60] flex justify-end font-semibold">
              {pendingReviews}
            </h2>
          </div>
        </div>
      )}

      {/* Feedback Table */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#454B60]">Feedback</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-10">
              <img src="/sortby.svg" alt="sort" className="w-4 h-4 ml-3 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 bg-white text-sm text-gray-600 px-3 py-2 appearance-none outline-none"
                disabled={loading}
              >
                <option value="">Sort by</option>
                <option value="id">ID</option>
                <option value="name">Name</option>
                <option value="date">Date</option>
              </select>
              <FaChevronDown className="w-4 h-4 mr-3 text-gray-500 pointer-events-none" />
            </div>
            <div className="relative h-10">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 border border-gray-300 rounded-lg text-sm h-full outline-none"
                disabled={loading}
              />
              <img
                src="/search.svg"
                alt="search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto border border-gray-200 rounded-sm">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">User</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Message</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Registration Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleReviews.length > 0 ? (
                visibleReviews.map((review) => (
                  <tr key={review._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 text-[#454B60]">{users[review.user]?.name || "Unknown"}</td>
                    <td className="py-4 px-4 text-gray-600">{review.comment}</td>
                    <td className="py-4 px-4 text-gray-600">
                      {new Date(review.createdAt).toLocaleDateString("en-US")}
                    </td>
                    <td className="py-4 px-4">
                      {review.status === "resolved" ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <button
                          onClick={() => handleResolveReview(review._id)}
                          className="px-3 py-1 text-sm font-medium text-white bg-[#4383CE] rounded-md hover:bg-blue-600 disabled:opacity-50"
                          disabled={loading}
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 px-4 text-gray-600 text-center">
                    No reviews available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          {visibleReviewsCount < filteredReviews.length && (
            <button
              onClick={handleSeeMore}
              className="px-4 py-2 text-sm font-medium text-white bg-[#4383CE] rounded-md hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              See More
            </button>
          )}
          {visibleReviewsCount > initialPageSize && (
            <button
              onClick={handleSeeLess}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 disabled:opacity-50"
              disabled={loading}
            >
              See Less
            </button>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Rating Distribution */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#454B60] mb-6">Rating Distribution</h2>
          <div className="space-y-3">
            {normalizedDistribution.map((rating) => (
              <div key={rating.stars} className="flex items-center space-x-3">
                {renderStars(rating.stars)}
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${Math.min(rating.percentage, 100).toFixed(0)}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">{rating.percentage.toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Rating */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#454B60] mb-6">Recent Rating</h2>
          <div className="space-y-4">
            {analytics.recent.map((rating) => (
              <div key={rating._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    <img
                      src={users[rating.user]?.image || defaultImage}
                      alt="user"
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => (e.target.src = defaultImage)}
                    />
                  </div>
                  {console.log(users[rating.user]?.image)}
                  <div>
                    <p className="text-[#454B60] font-medium">{users[rating.user]?.name || "Unknown"}</p>
                    {renderStars(rating.rating)}
                  </div>
                </div>
                <span className="text-sm text-gray-600">
                  {new Date(rating.createdAt).toLocaleDateString("en-US")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;