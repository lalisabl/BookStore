import { BiSearch } from "react-icons/bi";
import { BookGrid } from "../book/BookGrid";
import { BookList } from "../book/BookList";
import { BooksSample } from "../../assets/constData";

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
      </div>
      <Recommended />
    </>
  );
}

function Recommended() {
  return (
    <>
      <BookGrid />
      <BookList books={BooksSample.books} />
    </>
  );
}
