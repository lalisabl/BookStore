import React from "react";
import UserNav from "../components/user/userNav";
import { UserSideBar } from "../components/user/side-bar";

export function UserPage({ SetLogin }) {
  return (
    <div>
      <div className="user-main-container">
        <UserNav setLogin={SetLogin} />
        <UserSideBar />
        <div>User page</div>
      </div>
    </div>
  );
}
