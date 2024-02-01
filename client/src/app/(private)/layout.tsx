import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NoTokenKick from "@/components/NoTokenKick";
import AdminKick from "@/components/AdminKick";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const links = [{ name: "Dashboard", href: "/dashboard" }];
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
        {/* admin? kick admin-dashboard */}
        <AdminKick>
          <Header links={links} />
          {children}
          <Footer items={items} />
        </AdminKick>
      </NoTokenKick>
    </>
  );
};

export default Layout;
