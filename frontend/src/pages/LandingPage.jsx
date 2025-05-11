import React from "react";
import LoginButton from "../components/LoginButton"

export default function LandingPage() {


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <img
            src="https://img.icons8.com/color/96/000000/briefcase--v2.png"
            alt="BizNest Logo"
            className="mb-2"
            style={{ width: 64, height: 64 }}
          />
          <h1 className="text-4xl font-extrabold text-green-800 mb-2 tracking-tight drop-shadow">
            BizNest
          </h1>
          {/* <div className="text-sm text-gray-500 mb-1"></div> */}
          <div className="text-center text-gray-600 mb-4">
            <span role="img" aria-label="sparkles">✨</span> 
            The AI-powered CRM that turns segments into sales, and marketers into wizards.
          </div>
        </div>
        <LoginButton />
        <div className="mt-6 text-xs text-gray-400 text-center">
          <span role="img" aria-label="lock">🔒</span>  
          We only use your Google account to identify you. No spam, no drama, just CRM magic.
        </div>
      </div>
      <footer className="mt-10 text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} BizNest &mdash; Built for Xeno SDE Assignment
      </footer>
    </div>
  );
}
