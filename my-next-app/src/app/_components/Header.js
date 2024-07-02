"use client"
import React from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';  // Import useUser from Clerk

export default function Header() {
  const { user } = useUser();  // Access user object from useUser

  const getStartedLink = user ? '/' : '/sign-in';  // Conditionally set the link based on user authentication

  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 border-b">
          <div className="flex h-16 items-center justify-between">
            <Image src='/logo.svg' width={100} height={90}/>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/"> Home </a>
                  </li>
                  <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About </a>
                  </li>
                  <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/Upload"> Upload </a>
                  </li>
                  <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/Contact"> Contact Us </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <a
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow"
                  href={getStartedLink}  // Use the conditional link
                >
                  {user ? 'Get Started' : 'Sign Up / Sign In'}  {/* Adjust button text based on user state */}
                </a>
              </div>

              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
