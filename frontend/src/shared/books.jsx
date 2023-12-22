import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faStar } from "@fortawesome/free-solid-svg-icons";
import { apiurl } from "../assets/constData";
import axios from "axios";
import { formatViews } from "../components/book/BookList";
export const Books = ({ book, isGrid }) => {
  const [isFollow, setIsfollow] = useState(true);
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiurl}/users/me`, {
          withCredentials: true,
        });
        setCurrentUser(response.data.data.user);
        console.log(response.data.data.user);
      } catch (err) {
        console.log("Error fetching data", err);
      }
    };

    fetchData();
    setIsfollow(currentUser && currentUser.following.includes(book.user._id));
  }, [currentUser, book.user._id]);

  const handlefollow = (isFollow, uploaderId) => {
    console.log(uploaderId);
    if (isFollow) {
      try {
        axios.post(`${apiurl}/users/uploaderId`, { withCredentials: true });
        setIsfollow(false);
      } catch (err) {
        setIsfollow(true);
      }
    }
  };

  const navigate = useNavigate();
  function fileType(filename) {
    filename;
    if (filename && typeof filename === "string") {
      const fileExtension = filename.split(".").pop().toLowerCase();
      return fileExtension;
    }
  }

  return (
    <div
      onClick={() => {
        navigate("/books/" + book._id);
      }}
      key={book._id}
      className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md"
    >
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
            {window.innerWidth < 700 && book.title.length > 35
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

              <button
                className={`btn-primary rounded-md ml-1 ${
                  isFollow ? "follow" : "unfollow"
                }`}
                onClick={() => handlefollow(isFollow, book.user._id)}
              >
                {isFollow ? <p>Follow </p> : <p>unFollow </p>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
