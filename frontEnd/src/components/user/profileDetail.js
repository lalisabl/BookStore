import { IoPencil } from "react-icons/io5";
const profileDetail = () => {
  return (
    <div>
      <div className="main-container">
        <h3>Profile Detail</h3>
        <div className="user-details">
          <div className="detail-item fname">
            <p>Full name</p>
            <button className="btn">Edit</button>
          </div>
          <div className="detail-item username">
            <p>User name</p>
            <span>helloreact2933</span>
          </div>
          <div className="detail-item password">
            <p>Password</p>
            <button className="btn">Edit </button>
          </div>
          <div className="detail-item e-mail">
            <p>Email</p>
            <span>hello@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profileDetail;
