import React, { useState } from "react";
import axios from "axios";
import { apiurl } from "../../assets/constData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faFile } from "@fortawesome/free-solid-svg-icons";
import { GenericLittleLoadingModal } from "../../shared/GenericModal";

const enumCategories = [
  "Fiction",
  "Non-Fiction",
  "Poetry",
  "Drama",
  "Children's Books",
  "Religion/Spirituality",
  "Science Fiction/Fantasy",
  "Mystery/Thriller",
  "Romance",
  "History",
  "Reference",
  "Humor/Satire",
  "Graphic Novels/Comics",
  "Science",
  "Travel",
  "Art/Photography",
  "Education",
  "Politics/Social Sciences",
  "Sports",
  "Philosophy",
];

const BookForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    file: null,
    downloadable: "no",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("downloadable", formData.downloadable);
    formDataToSend.append("file", formData.file);

    setLoading(true);
    try {
      const response = await axios.post(
        `${apiurl}/books/upload`,
        formDataToSend,
        { withCredentials: true }
      );
      setLoading(false);
      setMsg(response.data.message);
    } catch (error) {
      setLoading(false);
      setError(true);
      if (error.response.status === 401) {
        setMsg("un Authorized");
      }
      setMsg(error.response);
      console.error("Error:", error);
    }
  };

  return (
    <div className="book-form-container mx-auto w-3/4 h-screen flex items-center justify-center ">
      {loading && <GenericLittleLoadingModal isOpen={loading} />}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-100 p-8 bg-light-white rounded shadow-md"
      >
        <div className="mb-4">
          <input
            placeholder="Title"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">Select Category</option>
            {enumCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <CustomFileInput onChange={handleFileChange} />
        </div>

        <div className="mb-4">
          <div className="check-download">
            Downloadable:
            <label className="ml-2">
              <input
                type="radio"
                name="downloadable"
                value="yes"
                checked={formData.downloadable === "yes"}
                onChange={handleChange}
                className="mr-1"
              />
              Yes
            </label>
            <label className="ml-2">
              <input
                type="radio"
                name="downloadable"
                value="no"
                checked={formData.downloadable === "no"}
                onChange={handleChange}
                className="mr-1"
              />
              No
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary-white">
          Submit
        </button>
      </form>
    </div>
  );
};

const CustomFileInput = ({ onChange }) => {
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      onChange(file);
      setSelectedFileName(file.name);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(e);
      setSelectedFileName(file.name);
    }
  };

  return (
    <div
      className="custom-file-input"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {selectedFileName ? (
        <div className="selected-file">
          <span>{selectedFileName}</span>
          <button
            className="btn btn-danger"
            onClick={() => setSelectedFileName(null)}
          >
            Remove
          </button>
        </div>
      ) : (
        <label htmlFor="file" className="file-label">
          <FontAwesomeIcon icon={faFile} size="2x" />
          <span>Drag and drop a file or click to select</span>
        </label>
      )}
      <input
        type="file"
        id="file"
        name="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default BookForm;
