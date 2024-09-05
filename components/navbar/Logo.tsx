import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="h-[35px] w-[150px] flex items-center justify-center text-lg font-bold text-gray-800 hidden md:block"
    >
      {/* Replace the image with text */}
      <span>Loada Platform</span>
    </Link>
  );
};

export default Logo;
