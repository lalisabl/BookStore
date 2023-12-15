import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  function fileType(filename) {
    filename;
    if (filename && typeof filename === "string") {
      const fileExtension = filename.split(".").pop().toLowerCase();
      return fileExtension;
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 m-auto lg:grid-cols-1 gap-3 lg:w-5/6 sm:w-full">
      {books?.length > 0 &&
        books.map((book) => (
          <div
            onClick={() => {
              navigate("/books/" + book.id);
            }}
            key={book.id}
            className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md"
          >
            <div className="flex w-full">
              <img
                src={
                  fileType(book.filename) === "pdf"
                    ? "images/pdf.png"
                    : fileType(book.filename) === "doc" ||
                        fileType(book.filename) === "docx"
                      ? "images/word.png"
                      : "images/default.png"
                }
                alt={book.title}
                className="w-20  h-auto object-contain bg-gray-100"
              />

              <div className="p-3 flex flex-col justify-between">
                <h3 className="text-sm text-left font-semibold mb-1">
                  {window.innerWidth < 700 && book.title.length > 35
                    ? `${book.title.substring(0, 35)}...`
                    : window.innerWidth < 1000 && book.title.length > 75
                      ? `${book.title.substring(0, 75)}...`
                      : book.title.length > 95
                        ? `${book.title.substring(0, 95)}...`
                        : book.title}
                </h3>

                <div className="flex text-xs text-gray-500 gap-2">
                  <div className="flex items-center mb-1">
                    <FontAwesomeIcon
                      className="text-yellow-500"
                      icon={faStar}
                    />
                    {/* {book.rate} */} 3.5
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon className="text-blue-500" icon={faEye} />
                    23k
                  </div>
                </div>

                <div className="flex w-full items-center book-owner border-t pt-1">
                  <img
                    src={
                      "http://localhost:5000/images/users/" +
                      book.user.profile.picture +
                      ".png"
                    }
                    alt={book.user.username}
                    className="w-8 rounded-full mr-1"
                  />
                  <div>
                    <span className="font-semibold text-gray-500">
                      {book.user.username}
                    </span>
                    <button className="btn-primary ml-1">
                      <FontAwesomeIcon icon={faPlus} /> Follow
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
