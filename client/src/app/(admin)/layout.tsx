import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NoTokenKick from "@/components/NoTokenKick";
import NoAdminKick from "@/components/NoAdminKick";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const links = [{ name: "Admin Books", href: "/admin-books" }];
  const items = [
    {
      title: "Navigation",
      links: links,
    },
  ];
  return (
    <>
      {/* no token? kick login */}
      <NoTokenKick>
        {/* no admin? kick dashboard */}
        <NoAdminKick>
          <Header links={links} />
          {children}
          <Footer items={items} />
        </NoAdminKick>
      </NoTokenKick>
    </>
  );
};

export default Layout;
