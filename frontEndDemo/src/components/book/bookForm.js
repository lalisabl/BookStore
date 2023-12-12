import React, { useState } from "react";
import axios from "axios";
import { apiurl } from "../../assets/constData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faFile } from "@fortawesome/free-solid-svg-icons";

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
    console.log("Event:", e);
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
    console.log(formDataToSend);
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiurl}/books/upload`,
        formDataToSend
      );
      setLoading(false);
      console.log("Response:", response.data);
      setMsg(response.data.message);
    } catch (error) {
      setLoading(false);
      setError(true);
      if (error.response.status === 401) {
        //login first
        setMsg("un Authorized");
      } if (error.response.status === 401) {
        //login first
        setMsg("un Authorized");
      } 
      setMsg(error.response);
      console.error("Error:", error);
    }
  };

  return (
    <div className="book-form-container">
      <form onSubmit={handleSubmit} className="book-form">
        <div>
          <input
            placeholder="Title"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {enumCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {/* <div>
          <label htmlFor="thumbnail">Thumbnail (jpeg, png, jpg):</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleFileChange}
          />
        </div> */}

        <CustomFileInput onChange={handleFileChange} />
        <div className="check-download">
          Downloadable:
          <label>
            <input
              type="radio"
              name="downloadable"
              value="yes"
              checked={formData.downloadable === "yes"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="downloadable"
              value="no"
              checked={formData.downloadable === "no"}
              onChange={handleChange}
            />
            No
          </label>
        </div>
        <button className="btn btn-primary-white" type="submit">
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
