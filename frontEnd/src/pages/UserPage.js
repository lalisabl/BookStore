import React from "react";
import UserNav from "../components/user/userNav";
import { UserSideBar } from "../components/user/side-bar";

export function UserPage({ path }) {
  return (
    <div>
      <div className="user-main-container">
        <UserNav />
        <UserSideBar />
        <div className="main">{path}</div>
      </div>
    </div>
  );
}
