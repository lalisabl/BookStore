import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { BooksSample } from "../../assets/constData";
import { formatViews } from "./BookList";

export function BookGrid() {
  return (
    <>
      <h1>grid view</h1>
      <div className="grid-display">
        {BooksSample.books.map((book) => (
          <div className="grid-item book-hover" key={book.id}>
            <span>
              <img src={book.thumbnail} />
            </span>
            <div className="book-detail">
              <div className="book-title">
                {book.title.length > 35
                  ? `${book.title.substring(0, 35)}...`
                  : book.title}
              </div>
              <div>
                <FontAwesomeIcon className="icon" icon={faStar} /> {book.rate}
              </div>
              <div>
                {" "}
                <FontAwesomeIcon className="icon" icon={faEye} />
                {formatViews(book.numberOfViews)}
              </div>
            </div>
            <div className="book-owner">
              <img src={book.uploader.image} />

              <div>
                <div>{book.uploader.username}</div>
                <div className="btn-primary">
                  <FontAwesomeIcon className="icon" icon={faPlus} />{" "}
                  <span className="mobile-hidden">follow</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}