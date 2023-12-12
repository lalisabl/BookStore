import UserNav from "../components/user/userNav";
import { UserSideBar } from "../components/user/side-bar";

export function UserPage({ SetLogin, path }) {
  return (
    <div className="flex h-screen">
      {/* Fixed Navigation Bar */}
      <div className="fixed top-0 left-0 w-full bg-white border-b border-gray-300">
      <UserNav/>
      </div>

      <div className="">
        {/* Fixed Sidebar */}
          <UserSideBar />
     

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {path}
        </div>
      </div>
    </div>
  );
}

