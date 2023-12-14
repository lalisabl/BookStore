import { useParams } from "react-router-dom";
import { BooksSample } from "../assets/constData";
import { useEffect } from "react";
import { formatViews } from "../components/book/BookList";
export default function BookDetailPage() {
  const { id } = useParams();
  const book = BooksSample.books.filter((n) => n.id === 1)[0];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <div className="w-max bg-white rounded-md overflow-hidden shadow px-2">
        <div className="mb-4">
          <img src={book.thumbnail} alt={book.title} className="w-80 h-auto" />
        </div>
        <div className="text-lg font-semibold mb-2">{book.title}</div>
        <div className="text-gray-600 mb-2">
          Views: {formatViews(book.numberOfViews)}
        </div>
        <div className="text-yellow-500 mb-2">Rating: {book.rate}</div>
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
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
              Follow
            </button>
          ) : (
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full">
              Unfollow
            </button>
          )}
        </div>
      </div>
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
    </div>
  );
}
