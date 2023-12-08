import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { BooksSample } from "../../assets/constData";

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
              <div>{book.title}</div>
              <div>
                <FontAwesomeIcon className="icon" icon={faStar} /> {book.rate}
              </div>
              <div>
                {" "}
                <FontAwesomeIcon className="icon" icon={faEye} />
                {book.numberOfViews}
              </div>
            </div>
            <div className="book-owner">
              <img src={book.uploader.image} />
              <div className="btn-primary">
                <FontAwesomeIcon className="icon" icon={faPlus} /> follow
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
