import React from 'react';
import { AlignJustify } from 'lucide-react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

export default function TopHeader({ setToggleBar, isSidebarOpen }) {
  return (
    <div className="flex p-5 border-b items-center justify-between md:justify-end">
      {/* Show AlignJustify icon only on smaller screens */}
      <AlignJustify className="block md:hidden" onClick={setToggleBar} />

      {!isSidebarOpen && (
        <div className="flex items-center">
          {/* Show logo and website name only on smaller screens */}
          <Image src="/logo.svg" width={80} height={20} className="block md:hidden" alt="Logo" />
          <h1 className="ml-2 text-2xl font-bold text-gray-700 block md:hidden">EncryShare</h1>
        </div>
      )}

      {/* UserButton remains visible across all screen sizes */}
      <UserButton />
    </div>
  );
}
