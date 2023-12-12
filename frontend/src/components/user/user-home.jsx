import { BiSearch } from "react-icons/bi";
import { BookGrid } from "../book/BookGrid";

export default function UserHome() {
  return (
    <div>
      <HomeBanner />
    </div>
  );
}

export function HomeBanner() {
  return (
    <>
      <div className="home-banner">
        <div className="search-container">
          <div className="form">
            <form>
              <select>
                <option value="">Categories</option>
              </select>
              <span className="search-input">
                <input title="text" placeholder="Search book here" />
                <button className="btn btn-primary">
                  <BiSearch />
                </button>
              </span>
            </form>
          </div>
        </div>
        <div className="container">
          <Recommended />
        </div>
      </div>
    </>
  );
}

function Recommended() {
  return (
    <>
      <BookGrid />
    </>
  );
}
