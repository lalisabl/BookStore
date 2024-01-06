import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  apiurl,
  enumCategories,
  enumCategoriesOptions,
} from "../../assets/constData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faFile } from "@fortawesome/free-solid-svg-icons";
import { GenericLittleLoadingModal } from "../../shared/GenericModal";
import CreatableSelect from "react-select/creatable";
import { KeyboardEventHandler } from "react";
import { useNavigate } from "react-router-dom";

const allowedDocumentExtensions = [
  "pdf",
  "doc",
  "docx",
  "txt",
  "xls",
  "rtf",
  "odt",
  "csv",
  "ods",
  "xlsx",
  "ppt",
  "pptx",
];
const BookForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: [],
    file: null,
    downloadable: true,
  });

  const [tags, setTags] = useState([]);
  useEffect(() => {
    console.log("tags from up", tags);
  }, [tags]);
  const handleTagCreation = (newTags) => {
    setTags(newTags);
    setFormData({
      ...formData,
      tags: newTags,
    });
  };

  const handleChangeCategory = (selectedOption) => {
    const categoryValue = selectedOption ? selectedOption.value : ""; // Use an empty string if no category selected

    setFormData({
      ...formData,
      category: categoryValue,
    });
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      [e.target.name]: file,
    });
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();

      // Check if the file extension is in the allowed document extensions
      if (allowedDocumentExtensions.includes(fileExtension)) {
        setFormData({
          ...formData,
          [e.target.name]: file,
        });
      } else {
        setError(true);
        setMsg(`unsupported file type \n only the following allowed   "pdf",
        "doc",
        "docx",
        "txt",
        "xls",
        "rtf",
        "odt",
        "csv",
        "ods",
        "xlsx",
        "ppt",
        "pptx",
      `);
        console.log("Unsupported file type");
      }
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("downloadable", formData.downloadable);
    formDataToSend.append("file", formData.file);
    formDataToSend.append("tag", formData.tags);

    // setLoading(true);
    // try {
    //   const response = await axios.post(
    //     `${apiurl}/books/upload`,
    //     formDataToSend,
    //     { withCredentials: true }
    //   );
    //   setLoading(false);
    //   setError(false);
    //   setMsg(response.data.message);
    // } catch (error) {
    //   setLoading(false);
    //   setError(true);
    //   if (error.response.status === 401) {
    //     setMsg("unAuthorized");
    //   }
    //   console.log(error.response.data.message);
    //   setMsg(error.response.data.message);
    //   console.error("Error:", error);
    // }
  };

  return (
    <div className="m-auto flex items-center justify-center">
      {loading && <GenericLittleLoadingModal isOpen={loading} />}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-100 p-8 bg-light-white rounded shadow-md"
      >
        {!loading && !error && msg !== "" ? (
          <div className="text-green-600 bg-green-100 p-3 rounded-md mb-4">
            {msg} You will be redirected to the home page in 2 seconds.{" "}
            {setTimeout(() => navigate("/"), 3000)}
          </div>
        ) : !loading && error ? (
          <div className="text-red-600 bg-red-100 p-3 rounded-md mb-4">
            {msg}
          </div>
        ) : (
          <></>
        )}

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
          <CreatableSelect
            isClearable
            options={enumCategoriesOptions}
            placeholder="Categories"
            onChange={handleChangeCategory}
            className="z-100 mr-3 w-full"
          />
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
                value={true}
                checked={formData.downloadable === true}
                onChange={handleChange}
                className="mr-1"
              />
              Yes
            </label>
            <label className="ml-2">
              <input
                type="radio"
                name="downloadable"
                value={false}
                checked={formData.downloadable === false}
                onChange={handleChange}
                className="mr-1"
              />
              No
            </label>
          </div>
        </div>

        <div className="mb-4">
          <CreatorComponent handleTagCreation={handleTagCreation} />
        </div>

        <button
          disabled={error}
          type="submit"
          className="btn btn-primary-white"
        >
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
      className="custom-file-input w-full"
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
        accept=".pdf, .doc, .docx, .txt, .xls, .rtf, .odt, .csv, .ods, .xlsx, .ppt, .pptx"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

const CreatorComponent = ({ handleTagCreation }) => {
  const enumCategoriesOptions = enumCategories.map((category, index) => ({
    value: category,
    label: category,
  }));

  const [tags, setTags] = useState([]);

  const handleCreateOption = (inputValue) => {
    const newTag = inputValue;
    setTags([...tags, newTag]);
    handleTagCreation([...tags, newTag]);
  };

  const handleChange = (inputValue) => {
    const newTag = inputValue;
    setTags([...tags, newTag]);
    handleTagCreation([...tags, newTag]);
  };

  useEffect(() => {
    console.log("tags from t", tags);
  }, [tags]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      marginRight: "3px",
      padding: "6px",
    }),
  };

  const NoOptionsMessage = ({ inputValue }) => (
    <div className="react-select-no-options">
      No matching options found for `{inputValue}`.
    </div>
  );
  return (
    <CreatableSelect
      isMulti
      styles={customStyles}
      options={enumCategoriesOptions}
      placeholder="Create or select tags"
      onChange={(selectedOptions, { action, removedValue }) => {
        if (action === "create-option") {
          const newTag = selectedOptions[selectedOptions.length - 1].value;
          setTags([...tags, newTag]);
          handleTagCreation([...tags, newTag]);
        } else if (action === "remove-value") {
          if (removedValue.__isNew__) {
            const updatedTags = tags.filter(
              (tag) => tag !== removedValue.value
            );
            setTags(updatedTags);
            handleTagCreation(updatedTags);
          } else {
            const updatedTags = tags.filter(
              (tag) => tag !== removedValue.value
            );
            setTags(updatedTags);
            handleTagCreation(updatedTags);
          }
        } else {
          selectedOptions[selectedOptions.length - 1]?.value &&
            handleChange(selectedOptions[selectedOptions.length - 1].value);
        }
      }}
      isSearchable
      components={{ NoOptionsMessage }}
      isCreatable={false}
      className="z-100 mr-3 w-full"
    />
  );
};

export default BookForm;
