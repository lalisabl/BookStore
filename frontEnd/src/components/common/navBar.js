import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NavBar({ where }) {
  return <div>{where === "landing" ? <NavBarLanding /> : <></>}</div>;
}

export function NavBarLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchQ, setSearchQ] = useState("");
  const setSearch = (e) => {
    setSearchQ(e.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    searchParams.set("q", searchQ);
    const updatedSearchParams = searchParams.toString();
    const newURL = `${location.pathname}?${updatedSearchParams}`;
    navigate('/search?'+updatedSearchParams);
  };
  return (
    <div className="navbar">
      <div className="logo">
        <img src="images/pre-logo.png" />
      </div>
      <div className="search-bar">
        <form  onSubmit={handleSearchSubmit}>
          <input
            onChange={setSearch}
            type="text"
            placeholder="Search Books ..."
          />
          <button className="btn btn-primary">Search</button>
        </form>
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
