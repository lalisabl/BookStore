import ProfileDetail from "./profileDetail";
import ReadingHistory from "./readingHistory";
import Favorites from "./favorites";
import Books from "./myBooks";
const account = () => {
  return (
    <div>
      <div className="account-container">
        <div className="account-nav">
          <img className="logo" alt="logo-photo"></img>
          <div className="upload">upload</div>
          <div className="favorites">Fav</div>
          <div className="langueges">Lang</div>
          <button className="profile">
            <img className="userProfilePhoto"></img>
          </button>
        </div>
        <div className="account-sidebar">
          <div className="profile">Profile</div>
          <div className="reading-history">ReadingHistory</div>
          <div className="books">My Books</div>
        </div>
        <div className="account-main">
          <ProfileDetail />
        </div>
      </div>
    </div>
  );
};
export default account;
