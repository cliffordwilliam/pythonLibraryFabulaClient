import { item } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Footer = ({ items }: { items: item[] }) => {
  return (
    <footer className="bg-white shadow-2xl">
      <div className="container mx-auto flex flex-wrap gap-4 p-4">
        {/* logo + copyright */}
        <div className="flex flex-col gap-4 mr-auto">
          <Image
            src="/l2.svg"
            alt="Logo"
            width={37}
            height={37}
            priority
            style={{ width: "37px", height: "37px" }}
          />
          <p>Copyright © 2024, Inc.</p>
        </div>
        {/* items */}
        {items.map((item) => {
          return (
            <div key={item.title} className="flex flex-col gap-4">
              {/* title */}
              <h2 className="font-bold">{item.title}</h2>
              <ul className="flex flex-col gap-2">
                {item.links.map((link) => {
                  return (
                    // links
                    <li key={link.name}>
                      <Link
                        className="hover:text-orange-800 hover:underline"
                        href={link.href}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
