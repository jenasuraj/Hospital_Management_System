import type { Metadata } from "next";
import SuspenseWrapper from "@/wrappers/Suspense";

export const metadata: Metadata = {
  title: "Login page",
  description: "Access the dashboard via login page",
};

const Page = () => {
  return (
  <SuspenseWrapper/>
  );
};

export default Page;