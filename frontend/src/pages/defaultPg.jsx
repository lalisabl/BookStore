
import UserNav from "../components/user/userNav";
import BackBTN from "../shared/backbtn";
import Footer from "../components/common/footer";

export default function DefaultPage({ page }) {
  return (
    <div>
      <UserNav />
      <div className="mt-16  landing-pg">{page}</div>
      <Footer />
    </div>
  );
}
