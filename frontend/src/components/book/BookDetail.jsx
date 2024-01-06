import { useNavigate, useParams } from "react-router-dom";
import { BiDownload, BiInfoCircle, BiStar } from "react-icons/bi";
import { GoDiscussionDuplicate } from "react-icons/go";
import { apiurl, host } from "../../assets/constData";
import { FaReadme, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { formatViews } from "./BookList";
import { LoadingCardVert } from "../../shared/LoadingCard";
import { MdRateReview } from "react-icons/md";
import Follow from "../common/follow";
import { useSelector } from "react-redux";

function BookNavItem({ text, username }) {
  const navigate = useNavigate();

  const icons = {
    "Book info": <BiInfoCircle className="mr-1" />,
    "Discussion Forum": <GoDiscussionDuplicate className="mr-1" />,
    "Reviews and rates": <BiStar />,
    "Book contributor": <FaUser />,
  };

  const actions = {
    "Book info": "",
    "Discussion Forum": () => navigate("./forums"),
    "Reviews and rates": () => navigate("#give_rate"),
    "Book contributor": () => navigate(`/user/${username}`),
  };
  return (
    <div
      onClick={actions[text]}
      className="p-1 mb-3  rounded flex items-center cursor-pointer text-gray-900 hover:text-black "
    >
      {icons[text]} <div className="hidden sm:flex">{text}</div>
    </div>
  );
}

function BookNav({ contributor }) {
  const navItems = [
    "Book info",
    "Discussion Forum",
    "Reviews and rates",
    "Book contributor",
  ];

  return (
    <div className="fixed flex sm:flex-col top-12 -right-3 p-1 pr-4 pb-0 mt-1 sm:p-4 shadow bg-primary_bg text-left">
      {navItems.map((text, index) => (
        <BookNavItem username={contributor} key={index} text={text} />
      ))}
    </div>
  );
}

export default function BookDetail() {
  const { id } = useParams();
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState();
  const userInfo = useSelector((state) => state.store.userInfo);

  useEffect(() => {
    axios
      .get(`${apiurl}/books/get/${id}`)
      .then((res) => {
        setBook(res.data.data.book);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id, update]);
  function fileType(filename) {
    filename;
    if (filename && typeof filename === "string") {
      const fileExtension = filename.split(".").pop().toLowerCase();
      return fileExtension;
    }
  }

  const [fileUrl, setFileUrl] = useState();

  useEffect(() => {
    if (book && book.downloadable) {
      axios
        .get(`${apiurl}/books/download/${id}`)
        .then((res) => {
          setFileUrl(res.data.url);
        })
        .catch((err) => {});
    }
  }, [book, id]);
  const navigate = useNavigate();
  return (
    <div className="pb-3 mt-10">
      {loading ? (
        <div className="flex m-auto md:w-4/6 shadow sm:w-full     bg-white rounded-md overflow-hidden  px-2">
          <LoadingCardVert />
        </div>
      ) : (
        <>
          {book && (
            <>
              <div className="flex flex-wrap m-auto md:w-4/6 shadow w-full  bg-white rounded-md overflow-hidden  px-2">
                <div className="flex mb-4">
                  <div>
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
                  </div>
                </div>

                <div className="text-left">
                  <div className="text-lg font-semibold mb-2">
                    {book?.title}
                  </div>
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
                  <div className="flex flex-col items-start mb-2">
                    <div className="flex items-center">
                      <img
                        src={
                          `${host}/images/users/` + book?.user.profile?.picture
                        }
                        className="w-10 h-10 border mr-1 rounded-full"
                      />
                      <div className="flex flex-col">
                        {book?.user.username}
                        <Follow userInfo={userInfo} userId={book.user._id} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:ml-24 mb-4 flex z-0  sm:gap-3 items-end">
                  <a
                    rel="noreferrer"
                    href={`http://localhost:5000/file-1702504475442.pdf`}
                    download={"true"}
                    className="m-1 flex items-center  bg-gray-200 border rounded-lg p-1 hover:bg-gray-300"
                  >
                    <BiDownload className="text-xl" />

                    <span>Download</span>
                  </a>
                  <button
                    onClick={() => navigate("./read")}
                    className="m-1 flex items-center bg-gray-200 border rounded-lg p-1 hover:bg-gray-300"
                  >
                    <FaReadme />
                    Read Online
                  </button>
                  <a
                    href="#give_rate"
                    className="m-1 flex items-center bg-gray-200 border rounded-lg p-1 hover:bg-gray-300"
                  >
                    <MdRateReview />
                    Give rate
                  </a>
                </div>
              </div>

              <div className="flex flex-col m-auto md:w-4/6 sm:w-full   mt-3 shadow bg-white rounded-md p-4">
                <ReviewRate update={() => setUpdate(!update)} bookId={id} />
              </div>
              <ReviewRateDisplay reviews={book.reviews} />
            </>
          )}
        </>
      )}

      <BookNav contributor={book?.user.username} />
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
    <div id="give_rate">
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
                src={`${host}/images/users/` + review.user_id.profile.picture}
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
