import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { BooksSample } from "../../assets/constData";
import { formatViews } from "./BookList";
import { useNavigate } from "react-router-dom";

export function BookGrid({ books }) {
  function fileType(filename) {
    filename;
    if (filename && typeof filename === "string") {
      const fileExtension = filename.split(".").pop().toLowerCase();
      return fileExtension;
    }
  }

  const navigate = useNavigate();
  return (
    <>
      <h1>grid view</h1>
      <div className="gap-3 grid lg:grid-cols-8  md:grid-cols-5 grid-cols-3">
        {books?.map((book) => (
          <div
            onClick={() => {
              navigate("/books/" + book._id);
            }}
            className="border rounded-lg shadow"
            key={book.id}
          >
            <span>
              <img
                src={
                  fileType(book.filename) === "pdf"
                    ? "images/pdf.png"
                    : fileType(book.filename) === "doc" ||
                        fileType(book.filename) === "docx"
                      ? "images/word.png"
                      : "images/default.png"
                }
                className="bg-gray-100"
              />
            </span>
            <div  className=" text-sm p-1">
              <div className="font-bold text-left">
                {book.title.length > 35
                  ? `${book.title.substring(0, 35)}...`
                  : book.title}
              </div>
              <div>
                <FontAwesomeIcon className="icon" icon={faStar} /> 4.5
              </div>
              <div>
                <FontAwesomeIcon className="icon" icon={faEye} />
                {/* need to be edited */}
                {formatViews(4300202)}
              </div>
            </div>
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center text-xs p-1 border-t border-gray-50 pt-1"
            >
              <img
                src={
                  "http://localhost:5000/images/users/" +
                  book.user.profile.picture +
                  ".png"
                }
                className="w-8 rounded-full border mr-1"
              />

              <div>
                <div>{book.user.username}</div>
                <div className="btn-primary rounded-md ml-1">
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
