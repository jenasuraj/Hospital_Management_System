import HomeAppointmentPage from "@/ui/HomeAppointmentPage";
import HomeReachoutPage from "@/ui/HomeReachoutPage";
import HomePage from "@/ui/HomePage";


export default function Home() {
  console.log(" / Rendered in Server")
  return (
    <>
      <HomePage/>
      <HomeAppointmentPage/>
      <HomeReachoutPage/>
    </>
  );
}
