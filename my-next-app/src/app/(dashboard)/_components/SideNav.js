"use client";
import React, { useState } from 'react';
import { Upload, File, Shield } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Corrected import for router
import { useClerk } from '@clerk/nextjs'; // Importing signOut function from Clerk

export default function SideNav({ closeSidebar }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const { signOut } = useClerk(); // Accessing signOut function from Clerk

  const menuList = [
    { 
      id: 1,
      name: 'Upload',
      icon: Upload,
      path: '/Upload'
    },
    {
      id: 2,
      name: 'File',
      icon: File,
      path: '/ViewFiles'
    },
    {
      id: 3,
      name: 'Upgrade',
      icon: Shield,
      path: '/upgrade'
    }
  ];

  const handleItemClick = (index, path) => {
    setActiveIndex(index);
    closeSidebar();
    router.push(path);
  };

  return (
    <div className="shadow-sm border-r h-full">
      <div className="flex items-center p-5">
        <Image src="/logo.svg" width={80} height={20} alt="Logo" />
        <h1 className="ml-2 text-2xl font-bold text-gray-700">EncryShare</h1>
      </div>
      <div className='flex flex-col w-full'>
        {menuList.map((item, index) => (
          <button
            key={item.id}
            className={`flex gap-2 p-4 px-0 hover:bg-gray-100 w-full text-gray-500 ${activeIndex === index ? 'bg-blue-50 text-primary' : ''}`}
            onClick={() => handleItemClick(index, item.path)}
          >
            <div className='flex gap-4 ml-4'>
              <item.icon size={20} className='align-item-center' /> {/* Adjust icon size */}
              <h2 className='text-lg font-medium'>{item.name}</h2>
            </div>
          </button>
        ))}
      </div>
      <div className="p-2 w-full"> {/* Updated to use full width */}
        <a
          className="group relative inline-block overflow-hidden border border-primary px-8 py-3 focus:outline-none focus:ring w-full" // Added w-full class for full width
          onClick={() => signOut({ redirectUrl: '/' })}
        >
          <span
            className="absolute inset-y-0 left-0 w-[2px] bg-primary transition-all group-hover:w-full group-active:bg-indigo-500"
          ></span>
          <span
            className="relative text-center size-10 justify-items-center font-medium text-indigo-600 transition-colors group-hover:text-white"
          >
            Logout
          </span>
        </a>
      </div>
    </div>
  );
}
