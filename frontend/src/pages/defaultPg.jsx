import { FaArrowLeft } from "react-icons/fa";
import UserNav from "../components/user/userNav";

export default function DefaultPage({ page }) {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div>
      <UserNav />
      <button
        className="fixed z-30 border left-3 flex items-center"
        onClick={handleGoBack}
      >
        <FaArrowLeft className="text-xl" />
        Back
      </button>

      <div className="mt-14  landing-pg">{page}</div>
    </div>
  );
}
