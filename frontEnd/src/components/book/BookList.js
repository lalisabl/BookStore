import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { BooksSample } from "../../assets/constData";

export function formatViews(views) {
  if (views >= 1000000000) {
    return (views / 1000000000).toFixed(1) + "B";
  }
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + "M";
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + "K";
  } else {
    return views.toString();
  }
}
export function BookList() {
  return (
    <div className="list-view">
      <h1>List view</h1>
      {BooksSample.books.map((book) => (
        <div className="list-item book-hover" key={book.id}>
          <div>
            <img src={book.thumbnail} />
          </div>
          <div className="book-detail">
            <div className="book-title">
              {window.innerWidth < 700 && book.title.length > 35
                ? `${book.title.substring(0, 35)}...`
                : window.innerWidth < 1000 && book.title.length > 75
                ? `${book.title.substring(0, 75)}...`
                : book.title.length > 95
                ? `${book.title.substring(0, 95)}...`
                : book.title}
            </div>
            <div>
              <FontAwesomeIcon className="icon" icon={faStar} /> {book.rate}
            </div>
            <div>
              <FontAwesomeIcon className="icon" icon={faEye} />
              {formatViews(book.numberOfViews)}
            </div>
            <div className="book-owner">
              <img src={book.uploader.image} />

              <div>
                <span>{book.uploader.username}</span>
                <span className="btn-primary">
                  <FontAwesomeIcon className="icon" icon={faPlus} /> follow
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
