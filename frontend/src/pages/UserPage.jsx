import UserNav from "../components/user/userNav";
import { UserSideBar } from "../components/user/side-bar";

export function UserPage({ SetLogin, path }) {
  return (
    <div className="flex">
      <UserNav setLogin={SetLogin} />
      <UserSideBar />
      <div className="items-center flex-grow ml-20 user-main-container">
        {path}
      </div>
    </div>
  );
}
