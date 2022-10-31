import { useEffect } from "react";
import dynamic from "next/dynamic";
//custom
import TopNavbar from "../components/navbar/topNavbar";
import BottomNavbar from "../components/navbar/bottomNavbar";
import Modals from "../components/modal";
import Banner from "../components/elements/Banner";
import CookieAlert from "../components/elements/Cookies";
//dynamic
const HiOutlineInformationCircle = dynamic(
  async () => (await import("react-icons/hi")).HiOutlineInformationCircle
);

export default function Layout({ children }) {
  const enableDarkMode = () => {
    document.documentElement.classList.add("dark");
  };

  useEffect(() => {
    var element = document.getElementById("loader");
    if (element) {
      element.classList.add("hidden");
    }
  }, []);

  return (
    <div className="">
      <CookieAlert/>
      <TopNavbar />
      <div className="max-w-screen overflow-y-scroll overflow-x-hidden custom-scroll">
        <Modals />
        {children}
      </div>
      <Banner />
      <BottomNavbar />
    </div>
  );
}
