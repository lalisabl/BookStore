import { useState, useEffect } from "react";
import { apiurl } from "../../assets/constData";
import axios from "axios";
const Follow = ({ userInfo, book }) => {
  const [isFollow, setIsFollow] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (userInfo && userInfo.following) {
      setIsFollow(
        userInfo.following.some((item) => item._id === book.user._id)
      );
      setLoading(false);
    } else {
      setIsFollow(false);
      setLoading(false);
    }
  }, [userInfo, book.user._id]);
  const handleFollow = async (isFollow, uploaderId) => {
    if (!isFollow) {
      try {
        await axios.post(`${apiurl}/users/follow/${uploaderId}`, null, {
          withCredentials: true,
        });
        setIsFollow(true);
      } catch (err) {
        setIsFollow(false);
        console.error("Error following user:", err);
      }
    } else {
      try {
        await axios.post(`${apiurl}/users/unfollow/${uploaderId}`, null, {
          withCredentials: true,
        });
        setIsFollow(false);
      } catch (err) {
        setIsFollow(true);
        console.error("Error following user:", err);
      }
    }
  };
  return (
    <>
      {loading ? (
        <span>...</span>
      ) : (
        <button
          className={`btn-primary rounded-md ml-1 ${
            !isFollow ? "follow" : "unfollow"
          }`}
          onClick={() => handleFollow(isFollow, book.user._id)}
        >
          {!isFollow ? <p>Follow </p> : <p>unFollow </p>}
        </button>
      )}
    </>
  );
};

export default Follow;
