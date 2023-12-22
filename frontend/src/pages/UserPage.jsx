import UserNav from "../components/user/userNav";
import { UserSideBar } from "../components/user/side-bar";

export function UserPage({ SetLogin, path }) {
  return (
    <div className="flex">
      <UserNav setLogin={SetLogin} />
      <UserSideBar setLogout={SetLogin} />
      <div className="mt-14 items-center flex-grow p-0 lg:ml-16 md:ml-16 pl-0 sm:pl-2 sm:ml-10 lg:w-5/6 md:w-5/6 ml-0 sm:w-5/6 w-screen overflow-hidden ">
        {path}
      </div>
    </div>  
  );
}
