import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header';
import Sidebar from '../Components/Slidebar';

const Root = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar - Independent scroll */}
      <Sidebar />

      {/* Main content area: Header + Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Fixed at top */}
        <Header />

        {/* Main content - Independent scroll */}
        <main className="flex-1 bg-gray-100 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Root;