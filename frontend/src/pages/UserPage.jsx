import UserNav from "../components/user/userNav";
import { UserSideBar } from "../components/user/side-bar";
import BackBTN from "../shared/backbtn";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Footer from "../components/common/footer";

export function UserPage({ SetLogin, path }) {
  const back = useSelector((state) => state.store.backBtn);
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 640);
  };
  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="flex">
        <UserNav />
        <UserSideBar />
        <div className="mt-14 mb-0  items-center flex-grow p-0 lg:ml-16 md:ml-16 pl-0 sm:pl-2 sm:ml-10 lg:w-5/6 md:w-5/6 ml-0 sm:w-5/6 w-screen overflow-hidden ">
          {path}
        </div>
      </div>
    </>
  );
}
