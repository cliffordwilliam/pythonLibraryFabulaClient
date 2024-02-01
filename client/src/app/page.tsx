import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import TokenKick from "@/components/TokenKick";

const Page = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
  ];
  const items = [
    {
      title: "Navigation",
      links: links,
    },
  ];
  return (
    <>
      {/* token? kick admin dashboard */}
      <TokenKick>
        <Header links={links} />
        <main className="flex-1 bg-gray-100 flex">
          <Image
            src="/l2.svg"
            alt="Logo"
            width={180}
            height={37}
            className="p-4"
            style={{ height: "50rem", width: "auto", margin: "auto" }}
            priority
          />
        </main>
        <Footer items={items} />
      </TokenKick>
    </>
  );
};

export default Page;
