import LoginPage from "@/ui/LoginPage";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Login page",
  description: "Access the dashboard via login page",
};

const Page = () => {
  return (
    <section className="flex items-center justify-center min-h-screen text-white">
     <LoginPage/>
    </section>
  );
};

export default Page;