import { BookCategory } from "../components/book/bookCategory";
import { NavBarLanding } from "../components/common/navBar";

export function LandingPage({ SetLogin }) {
  return (
    <>
      <NavBarLanding setLogin={SetLogin} />
      <BookCategory />
    </>
  );
}
