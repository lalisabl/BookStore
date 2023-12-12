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
export function BookList({ books }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-8">
      {books.length > 0 &&
        books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="flex">
              <img src={book.thumbnail} alt={book.title} className="w-24 h-32 object-cover" />

              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {window.innerWidth < 700 && book.title.length > 35
                      ? `${book.title.substring(0, 35)}...`
                      : window.innerWidth < 1000 && book.title.length > 75
                      ? `${book.title.substring(0, 75)}...`
                      : book.title.length > 95
                      ? `${book.title.substring(0, 95)}...`
                      : book.title}
                  </h3>
                  <div className="flex items-center mb-2">
                    <FontAwesomeIcon className="text-yellow-500 mr-2" icon={faStar} />
                    {book.rate}
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon className="text-blue-500 mr-2" icon={faEye} />
                    {formatViews(book.numberOfViews)}
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <img
                    src={book.uploader.image}
                    alt={book.uploader.username}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <span className="font-semibold">{book.uploader.username}</span>
                    <button className="btn-primary ml-2">
                      <FontAwesomeIcon className="mr-2" icon={faPlus} /> Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

