
import React from "react";
import LoginButton from "./LoginButton";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <span className="text-lg font-bold text-blue-900">Biznest</span>
      <LoginButton />
    </header>
  );
}
