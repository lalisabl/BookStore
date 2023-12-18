import { useParams } from "react-router-dom";
import { BiInfoCircle, BiStar } from "react-icons/bi";
import { GoDiscussionDuplicate } from "react-icons/go";
import { BooksSample, apiurl } from "../../assets/constData";
import { formatViews } from "./BookList";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

function BookNavItem({ text }) {
  const icons = {
    "Book info": <BiInfoCircle className="mr-1" />,
    "Discussion Forum": <GoDiscussionDuplicate className="mr-1" />,
    "Reviews and rates": <BiStar />,
    "Book contributor": <FaUser />,
  };
  return (
    <div className="p-1 mb-3 rounded flex items-center cursor-pointer text-gray-900 hover:text-black ">
      {icons[text]} {text}
    </div>
  );
}

function BookNav() {
  const navItems = [
    "Book info",
    "Discussion Forum",
    "Reviews and rates",
    "Book contributor",
  ];

  return (
    <div className="fixed top-12 -right-3 p-4 shadow  text-left">
      {navItems.map((text, index) => (
        <BookNavItem key={index} text={text} />
      ))}
    </div>
  );
}

export default function BookDetail() {
  const { id } = useParams();
  // const book = BooksSample.books.filter((n) => n.id === 1)[0];

  const [book, setBook] = useState();

  useEffect(() => {
    axios.get(`${apiurl}/books/get/${id}`).then((res) => {
      setBook(res.data.data.book);
    });
  }, [id]);
  function fileType(filename) {
    filename;
    if (filename && typeof filename === "string") {
      const fileExtension = filename.split(".").pop().toLowerCase();
      return fileExtension;
    }
  }
  return (
    <div className="mr-14">
      {book && (
        <div className="flex m-auto w-4/6 h-auto border-t-o border-b bg-white rounded-md overflow-hidden shadow px-2">
          <div className="flex mb-4">
            <span>
              <img
                src={
                  fileType(book?.filename) === "pdf"
                    ? "images/pdf.png"
                    : fileType(book?.filename) === "doc" ||
                        fileType(book?.filename) === "docx"
                      ? "images/word.png"
                      : "images/default.png"
                }
                className="bg-gray-100"
              />
            </span>
          </div>

          <div className="text-left">
            <div className="text-lg font-semibold mb-2">{book?.title}</div>
            <div className="text-gray-600 mb-2">Views: {6780372}</div>
            <div className="text-yellow-500 mb-2">Rating: {book?.rate}</div>
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <img
                  src={
                    "http://localhost:5000/images/users/" +
                    book?.user.profile?.picture +
                    ".png"
                  }

                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>{book?.user.username}</div>
              </div>
              <div className="mt-2">
                <button className=" btn btn-primary text-white px-1 py-1">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BookNav />
    </div>
  );
}

function ReviewRate() {
  return (
    <div className="bg-white w-full sm:w-1/3 md:w-1/3 lg:w-2/6 xl:w-64 rounded-md overflow-hidden shadow p-4">
      <div className="text-lg font-semibold mb-2">Your Rating</div>

      <div className="flex-col items-center">
        <div className="mr-2 text-2xl">⭐️⭐️⭐️⭐️⭐️</div>
        <div>Your Review</div>
      </div>
    </div>
  );
}
