import UserNav from "../components/user/userNav";
import { UserSideBar } from "../components/user/side-bar";

export function UserPage({ SetLogin,path }) {
  return (
    <div>
      <div className="user-main-container">
        <UserNav setLogin={SetLogin} />
        <UserSideBar />
        {path}
      </div>
    </div>
  );
}
