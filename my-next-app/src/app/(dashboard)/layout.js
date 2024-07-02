"use client";
import React, { useState } from 'react';
import SideNav from './_components/SideNav';
import TopHeader from './_components/TopHeader';

function Layout({ children }) {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="fixed inset-y-0 z-50 hidden w-64 flex-col md:flex">
        <SideNav closeSidebar={() => setToggle(false)} />
      </div>
      {toggle ? (
        <div className='h-full w-64 flex-col fixed inset-y-0 z-30 bg-white flex'>
          <SideNav closeSidebar={() => setToggle(false)} />
        </div>
      ) : null}
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col md:ml-64">
        <TopHeader setToggleBar={() => setToggle(!toggle)} isSidebarOpen={toggle} />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
