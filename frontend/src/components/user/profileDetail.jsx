import { useState, useEffect } from "react";
import axios from "axios";
import { apiurl, host } from "../../assets/constData";
import GenericModal from "../../shared/GenericModal";
import { BiHide } from "react-icons/bi";
import Modal from "react-modal";
const ProfileDetail = () => {
  const [user, setUser] = useState([]);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [userNameModalIsOpen, setUserNameModalIsOpen] = useState(false);
  const [fullNameModalIsOpen, setFullNameModalIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  let apiUrl;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiurl}/users/me`, {
          withCredentials: true,
        });
        setUser(response.data.data.user);
        setLoading(false);
        console.log(response.data.data.user);
      } catch (err) {
        console.log("Error fetching data", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleEditPassword = () => {
    setShowPasswordPopup(true);
  };

  const handleProfileChange = () => {
    apiUrl = `${apiurl}/users/updateMe`;
    axios
      .patch(apiUrl, { fullName }, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setFullNameModalIsOpen(false);
      })
      .catch((error) => {
        console.error("Error updating Full Name:", error.response.data);
      });
  };
  const handleSavePassword = () => {
    apiUrl = `${apiurl}/users/updatePassword`;
    axios
      .patch(
        apiUrl,
        { currentPassword, newPassword },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data.data.user);
        setShowPasswordPopup(false);
      })
      .catch((error) => {
        console.error("Error updating Password", error.response.data);
      });
    console.log("Saving Password:", newPassword);
  };
  const handleUsernameSubmit = () => {
    // Add logic here to handle the submission of the new username
    console.log("New username submitted:", newUsername);
    setUserNameModalIsOpen(false);
  };
  return (
    <div>
      <div
        className=" ml-4  sm:mt-6 pl-2 pr-2 text-lg m-0
        sm:ml-[16.66667%]"
      >
        {loading ? (
          <span>Loading...</span>
        ) : (
          <div className="user-detail">
            <ProfilePhotoUploader user={user} />

            <div className="user-details m-5 flex flex-col gap-12 p-8 ">
              <div className="fname flex items-center justify-between">
                <h4 className=" text-lg font-bold">Full name</h4>
                {fullName !== "" ? (
                  <p className="text-gray-600">{fullName}</p>
                ) : (
                  <p className="text-gray-600">{user.profile.fullName}</p>
                )}
                <button
                  onClick={() => setFullNameModalIsOpen(true)}
                  className="btn"
                >
                  Edit
                </button>
              </div>
              <div className=" username flex items-center justify-between">
                <h4 className=" text-lg font-bold">User name</h4>
                <p className="text-gray-600">{user.username}</p>
                <button
                  onClick={() => setUserNameModalIsOpen(true)}
                  className="btn"
                >
                  Edit
                </button>{" "}
              </div>
              <div className=" password flex items-center justify-between">
                <h4 className=" text-lg font-bold">Password</h4>
                <p>********</p>
                <button onClick={handleEditPassword} className="btn">
                  Edit
                </button>
              </div>
              <div className="e-mail flex items-center justify-between">
                <h4 className=" text-lg font-bold">Email</h4>
                <div>{user?.email}</div>
                <span className="center"></span>
              </div>
            </div>
          </div>
        )}
      </div>
      {userNameModalIsOpen && (
        <GenericModal
          isOpen={userNameModalIsOpen}
          onClose={() => setUserNameModalIsOpen(false)}
        >
          <UsernameChangePopup
            newUsername={newUsername}
            setNewUsername={setNewUsername}
            onSave={handleUsernameSubmit}
            closeModal={() => setUserNameModalIsOpen(false)}
          />
        </GenericModal>
      )}

      {fullNameModalIsOpen && (
        <GenericModal
          isOpen={fullNameModalIsOpen}
          onClose={() => setFullNameModalIsOpen(false)}
        >
          <FullNameUpdate
            fullName={fullName}
            setFullName={setFullName}
            onSave={handleProfileChange}
            closeModal={() => setFullNameModalIsOpen(false)}
          />
        </GenericModal>
      )}

      {showPasswordPopup && (
        <GenericModal
          isOpen={showPasswordPopup}
          onClose={() => {
            setShowPasswordPopup(false);
          }}
        >
          <PasswordUpdate
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmNewPassword={confirmNewPassword}
            setConfirmNewPassword={setConfirmNewPassword}
            onSave={handleSavePassword}
          />
        </GenericModal>
      )}
    </div>
  );
};
const FullNameUpdate = ({ fullName, setFullName, onSave, closeModal }) => {
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
    <div className="p-4 bg-white rounded-md shadow-md relative">
      <h2 className="text-sm sm:text-xl font-bold mb-4">Change FullName</h2>
      <label
        htmlFor="newUsername"
        className="block text-sm font-medium text-gray-700"
      >
        New FullName:
      </label>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="your full name"
        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
      />
      {error && <p className="error-message">{error}</p>}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={onSave}
      >
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
    <div className=" flex flex-col gap-4 relative p-8">
      <h2 className="text-sm sm:text-xl font-bold text-center mb-4">
        Change Password
      </h2>
      <div className="relative">
        <label>
          Current Password:
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          />
          <BiHide className="absolute right-4 bottom-2" />
        </label>
      </div>

      <div className="relative">
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          />
          <BiHide className="absolute right-4 bottom-2" />
        </label>
      </div>

      <div className="relative">
        <label>
          Confirm New Password:
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          />
          <BiHide className="absolute right-4 bottom-2" />
        </label>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

// Set the root element for the modal
Modal.setAppElement("#root");
function ProfilePhotoUploader({ user }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const uploadProfilePicture = async (file) => {
    const apiUrl = `${apiurl}/users/updateMe`;
    try {
      const formData = new FormData();
      formData.append("picture", file);
      const response = await axios.patch(apiUrl, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Profile picture uploaded:", response.data);
    } catch (error) {
      console.error("Error uploading profile picture:", error.response.data);
      // Handle error or display an error message to the user
    }
  };
  const handlePictureChange = () => {
    uploadProfilePicture(selectedFile);
    closeModal();
  };
  const handleGetFollowers = () => {
    console.log("followers clicked");
  };
  const handleGetFollowing = () => {
    console.log("following clicked");
  };
  return (
    <div className="m-5 mb-20">
      <div className=" h-20 bg-gradient-to-r from-fuchsia-500 to-violet-500 relative">
        <button
          onClick={openModal}
          className="absolute left-8"
          style={{ bottom: "-50%" }}
        >
          <img
            src={`${host}/images/users/${user.profile.picture}`}
            alt="user-image"
            className="rounded-full w-16 h-16 object-cover"
          />
        </button>
        <div
          className="pro ml-5 pl-8 text-sm absolute left-12"
          style={{ bottom: "-70%" }}
        >
          <h4 className="text-lg font-bold">{user.profile.fullName}</h4>
          <p className="text-gray-600 flex gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <p className="mr-4 cursor-pointer" onClick={handleGetFollowers}>
                <span className="font-bold text-lg">{user.numFollowers}</span>{" "}
                Followers
              </p>
              <p className="cursor-pointer" onClick={handleGetFollowing}>
                <span className="font-bold text-lg">{user.numFollowing}</span>{" "}
                Following
              </p>
            </div>
          </p>
        </div>
      </div>
      <GenericModal isOpen={modalIsOpen} onClose={closeModal}>
        <div className="p-4">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg sm:text-2xl font-bold mb-4 text-center">
              Upload Profile Photo
            </h2>
            <input
              type="file"
              onChange={handleFileChange}
              className="mb-2 p-5 sm:mb-4 sm:p-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex sm:gap-4 justify-center">
            <button
              onClick={handlePictureChange}
              className="bg-blue-500 text-white m-4 px-4 py-2 rounded-md mr-2 hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              Upload
            </button>

            <button
              onClick={closeModal}
              className="bg-gray-300 text-gray-700 m-4 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      </GenericModal>
    </div>
  );
}

const UsernameChangePopup = ({
  newUsername,
  setNewUsername,
  closeModal,
  onSave,
}) => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md relative">
      <h2 className=" text-sm sm:text-xl font-bold mb-4">Change Username</h2>
      <label
        htmlFor="newUsername"
        className="block text-sm font-medium text-gray-700"
      >
        New Username:
      </label>
      <input
        type="text"
        id="newUsername"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500 text-center"
      />
      <button
        onClick={onSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default ProfileDetail;
