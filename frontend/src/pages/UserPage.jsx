import UserNav from "../components/user/userNav";
import { UserSideBar } from "../components/user/side-bar";

export function UserPage({ SetLogin, path }) {
  return (
    <div className="flex">
      <UserNav setLogin={SetLogin} />
      <UserSideBar />
      <div className="mt-14 items-center flex-grow p-0 ml-16 pl-2  w-5/6 overflow-hidden ">
        {path}
      </div>
    </div>
  );
}
