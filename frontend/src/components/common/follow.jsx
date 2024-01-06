import { useState, useEffect } from "react";
import { apiurl } from "../../assets/constData";
import axios from "axios";
import LoginRegisterPopUp from "../loginFormHandle";
import { useSelector } from "react-redux";
const Follow = ({ userInfo, userId }) => {
  const isLogin = useSelector((state) => state.store.isLogin);
  const [isFollow, setIsFollow] = useState(false);
  const [loading, setLoading] = useState(true);
  const currentUserId = userInfo._id;
  useEffect(() => {
    if (userInfo && userInfo.following) {
      setIsFollow(userInfo.following.some((item) => item._id === userId));
      setLoading(false);
    } else {
      setIsFollow(false);
      setLoading(false);
    }
  }, [userInfo, userId]);
  const [askLogin, setAskLogin] = useState(false);

  const HandleFollow = async (isFollow, uploaderId) => {
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
          onClick={() =>
            isLogin ? () => HandleFollow(isFollow, userId) : setAskLogin(true)
          }
        >
          {currentUserId !== userId &&
            (isFollow ? <p>Unfollow</p> : <p>Follow</p>)}
        </button>
      )}
      {askLogin && <LoginRegisterPopUp asklogin={true} />}
    </>
  );
};

export default Follow;
