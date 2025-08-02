import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: '/public/square.svg', active: true },
    { name: 'User', icon: '/public/user.svg', active: false },
    { name: 'Subscription', icon: '/public/computer-dollar.svg', active: false },
    { name: 'Advertising', icon: '/public/advertisiment.svg', active: false },
    { name: 'Feedback', icon: '/public/Group 4.svg', active: false },
    { name: 'Terms & Conditions', icon: '/public/shield-01.svg', active: false },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#4A90E2] text-white rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed 
          top-0 lg:top-[98px] 
          left-0
          z-40 lg:z-auto
          w-64
          h-full lg:h-[calc(100vh-98px)]
          bg-white
          shadow-lg
          text-[#505050]
          px-5
          pt-16 lg:pt-5
          transform lg:transform-none
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto
        `}
      >
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <div
                  className={`
                    flex items-center 
                    w-full lg:w-[216px] 
                    h-[44px] 
                    rounded-[8px] 
                    cursor-pointer
                    transition-all duration-200
                    hover:bg-gray-100
                    ${item.active 
                      ? 'bg-[#4A90E2] hover:bg-[#3a7bc8]' 
                      : 'hover:bg-gray-50'
                    }
                  `}
                >
                  <img 
                    className="px-3" 
                    src={item.icon} 
                    alt="icon" 
                  />
                  <span 
                    className={`
                      font-medium 
                      text-sm lg:text-base
                      truncate
                      ${item.active ? 'text-white' : 'text-[#505050]'}
                    `}
                  >
                    {item.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;