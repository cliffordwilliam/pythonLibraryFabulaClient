import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const NoAdminKick = ({ children }: { children: React.ReactNode }) => {
  const status = cookies().get("status");
  if (status && status.value !== "Admin") {
    redirect("/dashboard");
  }
  return <>{children}</>;
};

export default NoAdminKick;
