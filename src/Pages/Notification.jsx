import { useState } from 'react';

const Notification = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [readNotifications, setReadNotifications] = useState([1, 2]); // First 2 are read initially

    const notifications = [
        {
            id: 1,
            icon: '/user.svg',

            title: 'User "john@example.com" has successfully upgraded from Free to Pro.',
            time: '2 min ago'
        },
        {
            id: 2,
            icon: '/cancel-circle.svg',
            title: 'User "sadia.user42@gmail.com" attempted to upgrade to Pro but encountered an issue',
            time: '10 mins ago'
        },
        {
            id: 3,
            icon: '/flag-02.svg',
            title: 'User "rahim.khan12" submitted a new suggestion: "Please add a savings goal tracker."',
            time: '30 min ago'
        },
        {
            id: 4,
            icon: '/checkmark.svg',
            title: 'User "tasnia_98" left a 5-star review on the Play Store: "Very useful app. Helped me track my expenses easily!"',
            time: '2 hours ago'
        },
        {
            id: 5,
            icon: '/flag-02.svg',
            title: 'User "robin_dev23" has submitted a request to review the app.',
            time: 'Yesterday'
        }
    ];

    const filteredNotifications = notifications.filter(notification =>
        notification.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const markAllAsRead = () => {
        // Mark only first 2 as blue, rest white
        setReadNotifications([1, 2]);
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-medium text-gray-600">Notifications</h1>
                <button
                    onClick={markAllAsRead}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                    Mark all as read
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <img src="/search.svg" alt="search" className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search notification"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-[#4A90E2] bg-white"
                />
            </div>

            {/* Notifications List */}
            <div>
                {filteredNotifications.map((notification) => {
                    const isRead = readNotifications.includes(notification.id);
                    const bgColor =
                        isRead ? 'bg-[#E5EBFF]' : 'bg-white';

                    return (
                        <div
                            key={notification.id}
                            className={`${bgColor} border-b-2 border-gray-300 p-6 transition-colors`}
                        >
                            <div className="flex items-start space-x-4">
                                {/* Icon */}
                                <div
                                    className={`flex-shrink-0 w-10 h-10 rounded-full ${notification.iconColor} flex items-center justify-center`}
                                >
                                    <img src={notification.icon} alt="" className="w-5 h-5" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-gray-900 text-sm leading-relaxed">
                                        {notification.title}
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        {notification.time}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {filteredNotifications.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-2">
                        <img src="/search.svg" alt="no result" className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-gray-500">No notifications found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default Notification;
