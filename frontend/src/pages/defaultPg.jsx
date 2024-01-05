
import UserNav from "../components/user/userNav";
import BackBTN from "../shared/backbtn";
import Footer from "../components/common/footer";

export default function DefaultPage({ page }) {
  return (
    <div>
      <UserNav />
      <BackBTN />
      <div className="mt-14  landing-pg">{page}</div>
      <Footer />
    </div>
  );
}
