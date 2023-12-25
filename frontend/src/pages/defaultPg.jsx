import UserNav from "../components/user/userNav";

export default function DefaultPage({ page }) {
  return (
    <div >
      <UserNav />
      <div className="mt-14  landing-pg">
        {page}
      </div>
    </div>
  );
}
