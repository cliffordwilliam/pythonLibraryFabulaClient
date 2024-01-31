import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const TokenKick = ({ children }: { children: React.ReactNode }) => {
  const token = cookies().get("token");
  if (token && token.value.length > 0) {
    redirect("/dashboard");
  }
  return <>{children}</>;
};

export default TokenKick;
