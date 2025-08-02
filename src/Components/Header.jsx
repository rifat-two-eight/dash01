import { useLocation } from 'react-router';

const Header = () => {
  const location = useLocation();

  // Map route paths to titles
  const getTitle = (path) => {
    switch (path) {
      case '/':
        return 'Overview';
      case '/user':
        return 'User';
      case '/subscription':
        return 'Subscription';
      case '/advertising':
        return 'Advertising';
      case '/feedback':
        return 'Feedback';
      case '/terms':
        return 'Terms & Conditions';
      default:
        return 'Dashboard';
    }
  };

  const title = getTitle(location.pathname);

  return (
    <header className="bg-white fixed flex items-center h-[98px] text-[#505050] w-full px-4 border-b border-gray-200 flex-shrink-0">
      <div className="flex justify-between items-center w-full">
        {/* Mobile menu space + Dynamic page title */}
        <div className="flex items-center">
          {/* Space for mobile menu button */}
          <div className="w-12 lg:w-0"></div>
          <h1 className="text-2xl ms-2.5">{title}</h1>
        </div>

        {/* Profile section */}
        <div className="flex items-center gap-[13px] me-4 lg:me-[124px]">
          <img src="/assets/icons/notification-01.svg" alt="Notifications" />

          <img
            src="https://i.postimg.cc/3xBtfyJ5/Ellipse-1.png"
            alt="Profile"
            className="w-[58px] h-[58px] rounded-full object-cover border"
          />

          <div className="leading-tight hidden sm:block">
            <p className="text-xl lg:text-2xl font-medium text-[#000000]">John Doe</p>
            <span className="text-sm font-medium text-[#000000]">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;