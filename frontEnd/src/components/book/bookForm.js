import React, { useState } from "react";

const BookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    user: "",
    category: "",
    thumbnail: null,
    downloadable: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(formData);
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
            {/* Add options for each category */}
          </select>
        </div>
        <div>
          <label htmlFor="thumbnail">file /docx,pdf,txt:</label>
          <input type="file" name="file" onChange={handleFileChange} required />
        </div>
        <div>
          <label htmlFor="thumbnail">Thumbnail:/jpeg,png,jpg</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleFileChange}
          />
        </div>

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

export default BookForm;
