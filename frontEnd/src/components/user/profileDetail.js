import { useState } from "react";
import { IoPencil } from "react-icons/io5";
import { MdOutlineClear } from "react-icons/md";
import GenericModal from "../../shared/GenericModal";
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

  const handleClosePopup = () => {
    setShowFullNamePopup(false);
    setShowPasswordPopup(false);
  };

  const handleSaveFullName = () => {
    // Add logic to save the full name
    console.log("Saving Full Name:", fullName);
    handleClosePopup();
  };

  const handleSavePassword = () => {
    // Add logic to save the new password
    console.log("Saving Password:", newPassword);
    handleClosePopup();
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
          onClose={()=>setShowFullNamePopup(false)}
          children={
            <FullNameUpdate
              fullName={fullName}
              setFullName={setFullName}
              onSave={handleSaveFullName}
              onClose={handleClosePopup}
            />
          }
        />
      )}
      {showPasswordPopup && (
        <PasswordUpdate
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmNewPassword={confirmNewPassword}
          setConfirmNewPassword={setConfirmNewPassword}
          onSave={handleSavePassword}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};
const FullNameUpdate = ({ fullName, setFullName, onSave, onClose }) => {
  return (
    <div className="popup fname">
      <h3>Profile Full Name</h3>
      <button className="btn" onClick={onClose}>
        <MdOutlineClear />
      </button>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="your full name"
      />
      <button className="btn" onClick={onSave}>
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
  onClose,
}) => {
  return (
    <div className="popup pswd">
      <h3>Edit Password</h3>
      <button className="btn" onClick={onClose}>
        <MdOutlineClear />
      </button>
      <label>
        Current Password:
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </label>
      <label>
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <label>
        Confirm New Password:
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </label>
      <button className="btn" onClick={onSave}>
        Save
      </button>
      <button className="btn" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
};

export default ProfileDetail;
