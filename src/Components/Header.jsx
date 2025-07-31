import { useLocation } from 'react-router';

const Header = () => {
  const location = useLocation();

  // Map route paths to titles
  const getTitle = (path) => {
    switch (path) {
      case '/':
        return 'Overview';
      case '/feedback':
        return 'Feedback';
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
        <h1 className="text-xl font-semibold">{title}</h1>

        {/* Profile section */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.postimg.cc/3xBtfyJ5/Ellipse-1.png"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-white"
          />

          <div className="leading-tight">
            <p className="text-sm font-medium">John Doe</p>
            <span className="text-xs text-gray-400">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
