import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function NavBar({ where }) {
  return <div>{where === "landing" ? <NavBarLanding /> : <></>}</div>;
}

export function NavBarLanding() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="images/pre-logo.png" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search Books ..." />
        <button className="btn btn-primary">Search</button>
      </div>
      <div className="login-button">
        <span>
          <FontAwesomeIcon icon={faUser} className="icon" />
          Sign in
        </span>
        <div>
          <button className="btn btn-primary-white">Join for free</button>
        </div>
      </div>
    </div>
  );
}
