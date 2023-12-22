import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
    <>
      <div className="grid grid-cols-1 m-auto md:grid-cols-2 gap-3 lg:w-5/6 sm:w-full list-view">
        {books?.length > 0 &&
          books.map((book) => (
            <div
              onClick={() => {
                navigate("/books/" + book._id);
              }}
              key={book._id}
              className="bg-white w-auto border rounded-lg overflow-hidden shadow-sm hover:shadow-md"
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

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex w-full items-center text-xs  border-t pt-1"
                  >
                    <img
                      src={
                        "http://localhost:5000/images/users/" +
                        book.user.profile.picture +
                        ".png"
                      }
                      alt={book.user.username}
                      className="w-8 rounded-full border mr-1"
                    />
                    <div>
                      <span className="font-semibold text-gray-500">
                        {book.user.username}
                      </span>
                      <Follow />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

const Follow = () => {
  const [isFollow, setIsfollow] = useState(true);
  const handlefollow = () => {
    if (isFollow) {
      setIsfollow(false);
    } else {
      setIsfollow(true);
    }
  };
  return (
    <button
      className={`btn-primary rounded-md ml-1 ${
        isFollow ? "follow" : "unfollow"
      }`}
      onClick={() => handlefollow(isFollow)}
    >
      {isFollow ? (
        <div>
          <FontAwesomeIcon icon={faPlus} /> Follow{" "}
        </div>
      ) : (
        <div>
          <FontAwesomeIcon icon={faPlus} /> unFollow{" "}
        </div>
      )}
    </button>
  );
};
