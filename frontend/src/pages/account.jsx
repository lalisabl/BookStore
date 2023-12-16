import ProfileDetail from "../components/user/profileDetail";

import ReadingHistory from "../components/user/readingHistory";
import Favorites from "../components/user/favorites";
import Books from "../components/user/myContributions";
import "../assets/style/account.css";
import { AccountSideBar } from "../components/user/side-bar";
import UserNav from "../components/user/userNav";
const Account = ({ path }) => {
  return (
    <div>
      <div className="account-container">
        <UserNav />
        <AccountSideBar />
        <div>{path}</div>
      </div>
    </div>
  );
};
export default Account;
