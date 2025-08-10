const Feedback = () => {
  const feedbackData = [
    {
      user: "John Doe",
      message: "The new feature is amazing! Really helps with workflow.",
      date: "07/07/2025",
    },
    {
      user: "Sarah Khan",
      message: "The new feature is amazing! Really helps with workflow.",
      date: "07/07/2025",
    },
    {
      user: "Ahmed Ali",
      message: "The new feature is amazing! Really helps with workflow.",
      date: "07/07/2025",
    },
    {
      user: "John Doe",
      message: "The new feature is amazing! Really helps with workflow.",
      date: "07/07/2025",
    },
  ];

  const recentRatings = [
    {
      name: "David Wilson",
      date: "04/07/2025",
      rating: 5,
    },
    {
      name: "David Wilson",
      date: "04/07/2025",
      rating: 4,
    },
    {
      name: "David Wilson",
      date: "04/07/2025",
      rating: 2,
    },
  ];

  const ratingDistribution = [
    { stars: 5, percentage: 75 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ];

  const renderStars = (rating) => {
    return (
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
  };

  const renderRatingStars = (count) => {
    return (
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <img
            key={star}
            src={star <= count ? "/yellow-star.svg" : "/white-star.svg"}
            alt="star"
            className="w-6 h-6"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 ms-16">
      {/* Metrics Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <img
              className="bg-[#4383CE] rounded-full p-2"
              src="/email.svg"
              alt="email"
            />
            <span className="text-xl text-gray-700">Total Messages</span>
          </div>
          <h2 className="text-4xl text-[#454B60] flex justify-self-end font-semibold">
            247
          </h2>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <img src="/yellow-star.svg" alt="star" className="w-10 h-10" />
            <span className="text-xl text-gray-700">Average Rating</span>
          </div>
          <h2 className="text-4xl text-[#454B60] flex justify-self-end font-semibold">
            4.2
          </h2>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <img
              className="bg-[#4383CE] rounded-full p-2"
              src="/user3.svg"
              alt="user"
            />
            <span className="text-xl text-gray-700">Pending Reviews</span>
          </div>
          <h2 className="text-4xl text-[#454B60] flex justify-self-end font-semibold">
            28
          </h2>
        </div>
      </div>

      {/* Feedback Table */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#454B60]">
            Rating Distribution
          </h2>
          <div className="flex items-center space-x-4">
            {/* Sort By */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-10">
              <img
                src="/sortby.svg"
                alt="sort"
                className="w-4 h-4 ml-3 text-gray-500"
              />
              <select className="flex-1 bg-white text-sm text-gray-600 px-3 py-2 appearance-none outline-none">
                <option value="">Sort by</option>
                <option value="id">ID</option>
                <option value="name">Name</option>
                <option value="date">Date</option>
              </select>
              <img
                src="/drop.svg"
                alt="dropdown"
                className="w-4 h-4 mr-3 text-gray-500 pointer-events-none"
              />
            </div>

            {/* Search */}
            <div className="relative h-10">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 border border-gray-300 rounded-lg text-sm h-full outline-none"
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
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  User
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Message
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Registration Date
                </th>
              </tr>
            </thead>
            <tbody>
              {feedbackData.map((feedback, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-4 px-4 text-[#454B60]">{feedback.user}</td>
                  <td className="py-4 px-4 text-gray-600">
                    {feedback.message}
                  </td>
                  <td className="py-4 px-4 text-gray-600">{feedback.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Rating Distribution */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#454B60] mb-6">
            Rating Distribution
          </h2>
          <div className="space-y-3">
            {ratingDistribution.map((rating) => (
              <div key={rating.stars} className="flex items-center space-x-3">
                {renderRatingStars(rating.stars)}
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">
                  {rating.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Rating */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#454B60] mb-6">
            Recent Rating
          </h2>
          <div className="space-y-4">
            {recentRatings.map((rating, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-13 h-13 rounded-full flex items-center justify-center">
                    <img src="https://i.postimg.cc/3xBtfyJ5/Ellipse-1.png" alt="user" />
                  </div>
                  <div>
                    <p className="text-[#454B60] font-medium">{rating.name}</p>
                    {renderStars(rating.rating)}
                  </div>
                </div>
                <span className="text-sm text-gray-600">{rating.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
