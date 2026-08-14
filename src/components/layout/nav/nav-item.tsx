"use client";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { NavType } from "./_nav-mock";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

const NavItem: React.FC<NavType[0] & { setOpen?: Dispatch<SetStateAction<boolean>> }> = ({
  label,
  path,
  setOpen,
}) => {
  const pathname = usePathname();

  const onClickHandler = () => {
    if (typeof setOpen === "function") {
      setOpen(false);
    }
  };

  return (
    <li
      role="listitem"
      className={cn(
        "relative flex h-10 items-center rounded-md px-3 font-medium transition-colors duration-300 sm:h-7 sm:px-0",
        {
          "bg-muted sm:bg-transparent sm:text-ring": pathname === path,
        },
      )}
      onClick={onClickHandler}
    >
      <Link
        href={path}
        role="link"
        aria-label={label}
        prefetch={path === "/resume" ? false : undefined}
        className="el-focus-styles relative z-10 rounded-sm text-lg sm:text-base"
      >
        {label}
      </Link>

      {pathname === path && (
        <span className="absolute left-0 top-1 hidden size-full h-full w-full items-end justify-center sm:flex">
          <span className="z-0 h-0.75 w-full rounded-t-full bg-ring"></span>
        </span>
      )}
    </li>
  );
};

export default NavItem;
