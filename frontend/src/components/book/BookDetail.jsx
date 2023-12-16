import { useParams } from "react-router-dom";
import { BiInfoCircle, BiStar } from "react-icons/bi";
import { GoDiscussionDuplicate } from "react-icons/go";
import { BooksSample } from "../../assets/constData";
import { formatViews } from "./BookList";
import { FaUser } from "react-icons/fa";

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
    <div className="fixed top-12 -right-3 p-4  text-left">
      {navItems.map((text, index) => (
        <BookNavItem key={index} text={text} />
      ))}
    </div>
  );
}

export default function BookDetail() {
  const { id } = useParams();
  const book = BooksSample.books.filter((n) => n.id === 1)[0];

  return (
    <div className="mr-14">
      <div className="flex m-auto w-5/6 h-auto border-b bg-white rounded-md overflow-hidden shadow px-2">
        <div className="flex mb-4">
          <img src={book.thumbnail} alt={book.title} className="w-80 h-auto" />
        </div>

        <div className="text-left">
          <div className="text-lg font-semibold mb-2">{book.title}</div>
          <div className="text-gray-600 mb-2">
            Views: {formatViews(book.numberOfViews)}
          </div>
          <div className="text-yellow-500 mb-2">Rating: {book.rate}</div>
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <img
                src={book.uploader.image}
                alt={book.uploader.username}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>{book.uploader.username}</div>
            </div>
            <div className="mt-2">
              {book.uploader.followBtn ? (
                <button className=" btn btn-primary text-white px-1 py-1">
                  Follow
                </button>
              ) : (
                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full">
                  Unfollow
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <BookNav />
    </div>
  );
}

function ReviewRate() {
  return (
    <div className="bg-white w-full sm:w-1/3 md:w-1/3 lg:w-2/6 xl:w-64 rounded-md overflow-hidden shadow p-4">
      {/* Add user rate and review functionality */}
      {/* Example: */}
      <div className="text-lg font-semibold mb-2">Your Rating</div>
      {/* Add your rating component or logic here */}
      {/* Example: */}
      <div className="flex-col items-center">
        <div className="mr-2 text-2xl">⭐️⭐️⭐️⭐️⭐️</div>
        <div>Your Review</div>
      </div>
    </div>
  );
}
