import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      role="link"
      aria-label="Home"
      className="el-focus-styles rounded-md text-2xl font-bold italic"
    >
      <Image
        src="/images/logo.png"
        alt="personal avatar"
        height={40}
        width={40}
        className="rounded-md border shadow-sm"
      />
    </Link>
  );
};

export default Logo;
