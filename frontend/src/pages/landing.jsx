import { BookCategory } from "../components/book/bookCategory";
import { NavBarLanding } from "../components/common/navBar";
import { HomeBanner } from "../components/user/user-home";
import UserNav from "../components/user/userNav";

export function LandingPage({ SetLogin }) {
  return (
    <>
      <UserNav />
      <div className="mt-14 landing-pg">
        <HomeBanner />
      </div>

      <div className="items-center flex-grow p-0  bg-white overflow-hidden ">
        <BookCategory />
        <BookCategory />
      </div>
    </>
  );
}
