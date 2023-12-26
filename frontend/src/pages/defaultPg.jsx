import { useSelector } from "react-redux";
import UserNav from "../components/user/userNav";
import BackBTN from "../shared/backbtn";

export default function DefaultPage({ page }) {
  const back = useSelector((state) => state.store.backBtn);
  return (
    <div>
      <UserNav />
      <BackBTN />
      <div className="mt-14  landing-pg">{page}</div>
    </div>
  );
}
