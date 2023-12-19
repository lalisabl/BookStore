import { useParams } from "react-router-dom";
import { BiInfoCircle, BiStar } from "react-icons/bi";
import { GoDiscussionDuplicate } from "react-icons/go";
import { apiurl } from "../../assets/constData";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { formatViews } from "./BookList";

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
  const [update, setUpdate] = useState(false);
  // const book = BooksSample.books.filter((n) => n.id === 1)[0];

  const [book, setBook] = useState();

  useEffect(() => {
    axios.get(`${apiurl}/books/get/${id}`).then((res) => {
      setBook(res.data.data.book);
    });
  }, [id, update]);
  function fileType(filename) {
    filename;
    if (filename && typeof filename === "string") {
      const fileExtension = filename.split(".").pop().toLowerCase();
      return fileExtension;
    }
  }
  return (
    <div className="pb-3">
      {book && (
        <>
          <div className="flex m-auto md:w-4/6 shadow sm:w-full     bg-white rounded-md overflow-hidden  px-2">
            <div className="flex mb-4">
              <span>
                <img
                  src={
                    fileType(book?.filename) === "pdf"
                      ? "/images/pdf.png"
                      : fileType(book?.filename) === "doc" ||
                          fileType(book?.filename) === "docx"
                        ? "/images/word.png"
                        : "/images/default.png"
                  }
                  className="bg-gray-100 w-24 mr-2"
                />
              </span>
            </div>

            <div className="text-left">
              <div className="text-lg font-semibold mb-2">{book?.title}</div>
              <div className="text-gray-600 mb-2">
                Views: {formatViews(6780372)}
              </div>
              {book?.rating.length > 0 && (
                <div className=" flex flex-col gap-1">
                  <span className="text-sm text-gray-600">
                    {formatViews(book?.rating[0]?.numRates)} reviews
                  </span>
                  <RatingDisplay avgRate={book?.rating[0]?.avgRate} />
                </div>
              )}
              <div className="flex flex-col items-center mb-2">
                <div className="flex items-center">
                  <img
                    src={
                      "http://localhost:5000/images/users/" +
                      book?.user.profile?.picture +
                      ".png"
                    }
                    className="w-10 h-10 border mr-1 rounded-full"
                  />
                  <div className="flex flex-col">
                    {book?.user.username}{" "}
                    <button className=" text-sm  rounded-lg p-0 btn-primary text-white">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ReviewRate update={() => setUpdate(!update)} bookId={id} />
          <ReviewRateDisplay reviews={book.reviews} />
        </>
      )}

      <BookNav />
    </div>
  );
}

const ReviewRate = ({ update, bookId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSaveReview = () => {
    if (rating && review) {
      axios
        .post(
          `${apiurl}/books/setRate_review`,
          { bookId: bookId, rating: rating, comment: review },
          { withCredentials: true }
        )
        .then((res) => {
          update();
        })
        .catch((err) => {
          console.log(err);
        });

      setRating(0);
      setReview("");
    }
  };

  return (
    <div className="flex flex-col m-auto md:w-4/6 sm:w-full   mt-3 shadow bg-white rounded-md p-4">
      <div className="mb-4">
        <Rating
          initialRating={rating}
          emptySymbol={<FaStar size={32} color="#ddd" />}
          fullSymbol={<FaStar size={32} color="#f8ce0b" />}
          onChange={handleRatingChange}
        />
      </div>
      <div className="text-right">
        <textarea
          className="w-full p-2 border rounded-md"
          placeholder="Write your review..."
          value={review}
          onChange={handleReviewChange}
        />
        <button
          className="mt-4  px-4 py-2 btn-primary text-white rounded-md"
          onClick={handleSaveReview}
        >
          submit Review
        </button>
      </div>
    </div>
  );
};

const RatingDisplay = ({ avgRate, className }) => {
  return (
    <div className="flex text-lg ">
      <Rating
        className={className}
        readonly
        initialRating={avgRate}
        emptySymbol={<FaStar color="#ddd" />}
        fullSymbol={<FaStar color="#f8ce0b" />}
      />
      <span className={"ml-1" + " " + className}>{avgRate}</span>
    </div>
  );
};

const ReviewRateDisplay = ({ reviews }) => {
  return (
    <div className="flex flex-col m-auto md:w-4/6 sm:w-full  mt-3 shadow bg-gray-100 rounded-md p-4">
      <h2 className="text-lg font-semibold mb-4">User Reviews</h2>
      {reviews.length > 0 ? (
        reviews?.map((review) => (
          <div key={review.id} className="mb-4 text-gray-700">
            <div className="flex items-center mb-2 border-b">
              <img
                src={
                  "http://localhost:5000/images/users/" +
                  review.user_id.profile.picture
                }
                className="w-7 h-7 border  cursor-pointer mr-1 rounded-full"
              />
              <span className="text-xs cursor-pointer font-semibold ">
                {review.user_id.fullName}
              </span>
            </div>
            <div className="text-xl">
              <RatingDisplay className={"text-sm"} avgRate={review.rating} />
            </div>
            <p className="pl-4">{review.comment}</p>
            <hr className="my-2 border-t" />
          </div>
        ))
      ) : (
        <>there is no reviews yet</>
      )}
    </div>
  );
};
