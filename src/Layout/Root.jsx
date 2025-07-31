import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../Components/Slidebar';
import Header from '../Components/Header';


const Root = () => {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area: Header + Content */}
      <div className="flex-1 flex flex-col">
        {/* Header will be at the top, aligned to the right */}
        <Header />

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;
