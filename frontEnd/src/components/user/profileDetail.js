import { useState, useEffect } from "react";
import axios from "axios";
import { apiurl } from "../../assets/constData";
import { IoPencil } from "react-icons/io5";
import { MdOutlineClear } from "react-icons/md";
import GenericModal from "../../shared/GenericModal";
import { BiHide } from "react-icons/bi";
const ProfileDetail = () => {
  const [showFullNamePopup, setShowFullNamePopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleEditFullName = () => {
    setShowFullNamePopup(true);
  };

  const handleEditPassword = () => {
    setShowPasswordPopup(true);
  };

  const handleSaveFullName = () => {
    const apiUrl = `${apiurl}/users/updateMe`;
    axios
      .patch(apiUrl, { fullName }, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setShowFullNamePopup(false);
      })
      .catch((error) => {
        console.error("Error updating Full Name:", error.response.data);
      });
  };
  const handleSavePassword = () => {
    // Add logic to save the new password
    console.log("Saving Password:", newPassword);
  };
  return (
    <div>
      <div className="main-container">
        <h3>Profile Detail</h3>
        <div className="user-details">
          <div className="detail-item fname">
            <p>Full name</p>
            <button onClick={handleEditFullName} className="btn">
              Edit
            </button>
          </div>
          <div className="detail-item username">
            <p>User name</p>
            <span>helloreact2933</span>
          </div>
          <div className="detail-item password">
            <p>Password</p>
            <button onClick={handleEditPassword} className="btn">
              Edit{" "}
            </button>
          </div>
          <div className="detail-item e-mail">
            <p>Email</p>
            <span>hello@gmail.com</span>
          </div>
        </div>
      </div>
      {showFullNamePopup && (
        <GenericModal
          isOpen={showFullNamePopup}
          onClose={() => setShowFullNamePopup(false)}
          children={
            <FullNameUpdate
              fullName={fullName}
              setFullName={setFullName}
              onSave={handleSaveFullName}
            />
          }
        />
      )}
      {showPasswordPopup && (
        <GenericModal
          isOpen={showPasswordPopup}
          onClose={() => {
            setShowPasswordPopup(false);
          }}
          children={
            <PasswordUpdate
              currentPassword={currentPassword}
              setCurrentPassword={setCurrentPassword}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmNewPassword={confirmNewPassword}
              setConfirmNewPassword={setConfirmNewPassword}
              onSave={handleSavePassword}
            />
          }
        />
      )}
    </div>
  );
};
const FullNameUpdate = ({ fullName, setFullName, onSave }) => {
  const [error, setError] = useState(null);
  const handleSave = () => {
    if (!fullName.trim()) {
      setError("Full Name cannot be empty");
    } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      setError("Please enter a valid Full Name (only letters and spaces)");
    } else {
      setError(null);
      onSave();
    }
  };
  return (
    <div className="popup fname">
      <h3>Profile Full Name</h3>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="your full name"
      />
      {error && <p className="error-message">{error}</p>}
      <button className="btn btn-inactive" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

const PasswordUpdate = ({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmNewPassword,
  setConfirmNewPassword,
  onSave,
}) => {
  const [error, setError] = useState(null);
  const handleSave = () => {
    if (!currentPassword.trim()) {
      setError("Current Password cannot be empty");
    } else if (!newPassword.trim()) {
      setError("New Password cannot be empty");
    } else if (newPassword.length < 6) {
      setError("New Password must be at least 6 characters");
    } else if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(newPassword)) {
      setError("New Password must contain both letters and numbers");
    } else if (newPassword !== confirmNewPassword) {
      setError("Confirmation does not match the New Password");
    } else {
      setError(null);
      onSave();
    }
  };
  return (
    <div className="popup pswd">
      <h3>Change Password</h3>
      <div className="input-content">
        <label>
          Current Password
          <br />
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <BiHide className="eye-icons" />
        </label>
      </div>
      <div className="input-content">
        <label>
          New Password
          <br />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <BiHide className="eye-icons" />
        </label>
      </div>
      <div className="input-content">
        <label>
          Confirm New Password
          <br />
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <BiHide className="eye-icons" />
        </label>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button className="btn btn-inactive" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default ProfileDetail;
