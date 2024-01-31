"use client";

import { link } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header = ({ links }: { links: link[] }) => {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const actionToggleOpen = () => {
    setOpen(!open);
  };
  return (
    <header className="bg-white shadow-2xl sticky top-0">
      <div className="container mx-auto flex items-center justify-between p-4 bg-white">
        {/* logo */}
        <Image
          src="/l2.svg"
          alt="Logo"
          width={37}
          height={37}
          priority
          style={{ width: "37px", height: "37px" }}
        />
        {/* dropable */}
        <nav
          className={`absolute top-0 left-0 h-dvh w-dvw bg-white p-4 ${
            open ? "" : "hidden md:block"
          } md:static md:h-auto md:w-auto md:p-0`}
        >
          <ul className="flex flex-col gap-4 md:flex-row md:items-center">
            <li className="flex justify-between md:hidden">
              {/* logo */}
              <Image
                src="/l2.svg"
                alt="Logo"
                width={37}
                height={37}
                priority
                style={{ width: "37px", height: "37px" }}
              />
              {/* toggle */}
              <button onClick={(e) => actionToggleOpen()}>
                <Image
                  src="/xlg.svg"
                  alt="Next.js Logo"
                  width={37}
                  height={37}
                  priority
                />
              </button>
            </li>
            {/* links */}
            {links.map((link) => {
              return (
                <li key={link.name}>
                  <Link
                    onClick={(e) => actionToggleOpen()}
                    className={`${
                      pathName === link.href
                        ? "text-orange-700 font-bold"
                        : "hover:text-orange-800 hover:underline"
                    }`}
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* toggle */}
        <button className="md:hidden" onClick={(e) => actionToggleOpen()}>
          <Image
            src="/list.svg"
            alt="Next.js Logo"
            width={37}
            height={37}
            priority
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
