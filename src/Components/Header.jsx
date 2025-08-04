import { useLocation } from 'react-router';

const Header = () => {
  const location = useLocation();

  // Map route paths to titles
  const getTitle = (path) => {
    switch (path) {
      case '/dashboard':
        return 'Overview';
      case '/user':
        return 'USER';
      case '/profile':
        return 'Profile';
      default:
        return '';
    }
  };

  const title = getTitle(location.pathname);

  return (
    <header className="bg-[#FFFFFF] flex items-center h-[98px] text-[#505050] w-full px-4">
      <div className="flex justify-between items-center w-full ">
        {/* Dynamic page title */}
        <h1 className="text-2xl ms-2.5">{title}</h1>

        {/* Profile section */}
        <div className="flex items-center gap-[13px] me-[124px]">
          <img className='me-4' src="/public/notification-01.svg" alt="" />

          <img
            src="https://i.postimg.cc/3xBtfyJ5/Ellipse-1.png"
            alt="Profile"
            className="w-[58px] h-[58px] rounded-full object-cover border"
          />

          <div className="leading-tight">
            <p className="text-2xl font-medium text-[#000000]">John Doe</p>
            <span className="text-sm font-medium text-[#000000]">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
