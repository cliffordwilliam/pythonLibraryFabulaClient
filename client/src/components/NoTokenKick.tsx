import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const NoTokenKick = ({ children }: { children: React.ReactNode }) => {
  const token = cookies().get("token");
  if (!token || token.value.length <= 0) {
    redirect("/login");
  }
  return <>{children}</>;
};

export default NoTokenKick;
