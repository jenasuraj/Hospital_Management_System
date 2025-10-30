import LoginPage from "@/ui/LoginPage";
import type { Metadata } from "next";
import SessionProviderWrapper from "@/providers/SessionProviderWrapper";


export const metadata: Metadata = {
  title: "Login page",
  description: "Access the dashboard via login page",
};

const Page = () => {
  return (
    <SessionProviderWrapper>
    <section className="flex items-center justify-center min-h-screen text-white">
     <LoginPage/>
    </section>
    </SessionProviderWrapper>
  );
};

export default Page;