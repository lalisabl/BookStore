import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faStar } from "@fortawesome/free-solid-svg-icons";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { apiurl, host } from "../assets/constData";
import axios from "axios";
import { formatViews } from "../components/book/BookList";
import { useSelector } from "react-redux";
import Follow from "../components/common/follow";
export const Books = ({ book, isGrid }) => {
  const userInfo = useSelector((state) => state.store.userInfo);
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (userInfo && userInfo?.profile?.favorites) {
      setIsFavorite(userInfo.profile.favorites.includes(book._id));
      setLoading(false);
    } else {
      setIsFavorite(false);
      setLoading(false);
    }
  }, [userInfo, book._id]);

  function fileType(filename) {
    filename;
    if (filename && typeof filename === "string") {
      const fileExtension = filename.split(".").pop().toLowerCase();
      return fileExtension;
    }
  }

  const handleFavoriteClick = async (e, bookid) => {
    e.stopPropagation();
    await axios
      .post(`${apiurl}/favorites/${bookid}`, null, { withCredentials: true })
      .then((response) => {
        setMessage("Book added to favorites!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error updating favorites:", error.response.data);
      });
  };

  return (
    <div
      onClick={() => {
        navigate("/books/" + book._id);
      }}
      key={book._id}
      className={`bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md relative`}
    >
      {loading ? (
        <span>...</span>
      ) : (
        <button
          onClick={(e) => handleFavoriteClick(e, book._id)}
          className={`absolute top-0 right-0 text-xl }`}
        >
          {isFavorite ? (
            <BsBookmarkHeartFill className="text-red-500" />
          ) : (
            <BsBookmarkHeartFill className="text-blue-500" />
          )}
        </button>
      )}

      <div className={`${!isGrid ? "flex w-full" : ""}`}>
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
          className={`${
            !isGrid ? "w-24  h-auto object-contai" : ""
          } bg-gray-100`}
        />
        <div
          className={`${
            !isGrid ? "p-3 flex flex-col justify-between" : ""
          } p-1`}
        >
          <div className="text-sm text-left font-semibold mb-1">
            {window.innerWidth < 700 || (isGrid && book.title.length > 35)
              ? `${book.title.substring(0, 35)}...`
              : window.innerWidth < 1000 && book.title.length > 75
                ? `${book.title.substring(0, 75)}...`
                : book.title.length > 95
                  ? `${book.title.substring(0, 95)}...`
                  : book.title}
          </div>

          <div className={`flex items-center text-xs text-gray-500 gap-2`}>
            <div className={`flex items-center mb-1"`}>
              <FontAwesomeIcon className="text-yellow-500" icon={faStar} />
              {formatViews(book.rating[0]?.numRates)}
            </div>
            <div className={`flex items-center"`}>
              <FontAwesomeIcon className="text-blue-500" icon={faEye} />
              23k
            </div>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className={`flex w-full items-center text-xs  border-t pt-1${
              !isGrid ? " border-gray-50" : ""
            }`}
          >
            <img
              src={
                "http://localhost:5000/images/users/" +
                book.user.profile.picture
              }
              alt={book.user.username}
              className="w-8 rounded-full border mr-1"
            />
            <div>
              <span className="font-semibold text-gray-500">
                {book.user.username}
              </span>
              <Follow userInfo={userInfo} userId={book.user._id} />
            </div>
          </div>
        </div>
      </div>
      {message && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border rounded shadow-md">
          {message}
        </div>
      )}
    </div>
  );
};
