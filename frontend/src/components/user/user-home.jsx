import { BiSearch } from "react-icons/bi";
import { BookGrid } from "../book/BookGrid";
import GetBooks from "../book/getBooks";
import bgImage from "../../assets/images/Book-Banner.jpg";

import Select from "react-select";

export default function UserHome() {
  return (
    <div>
      <HomeBanner />
    </div>
  );
}

export function HomeBanner() {
  const handleSelectChange = (selectedOption) => {
    // Handle the selected option
    console.log("Selected option:", selectedOption);
  };
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ];
  const customStyles = {
    control: (provided) => ({
      ...provided,
      marginRight: "3px",
      padding: "6px",
    }),
  };
  return (
    <>
      <div>
        <div
          className="bg-cover -z-50 top-10 left-16 ml-2 fixed inset-0 max-h-64 w-screen"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

        <div className="p-10 m-auto justify-center flex">
          <div className="items-center">
            <form className="flex  relative items-center">
              <Select
                styles={customStyles}
                options={options}
                placeholder="Categories"
                onChange={handleSelectChange}
                className="z-100 mr-3"
              />
              <span className="items-center">
                <input
                  className="p-3  banner-search border rounded rounded-r-none border-gray-300"
                  type="text"
                  title="text"
                  placeholder="Search book here"
                />
                <button className="p-3  btn-primary text-white rounded-r-md">
                  Search
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <Recommended />
      </div>
    </>
  );
}

function Recommended() {
  return (
    <>
      <BookGrid />
      <GetBooks />
    </>
  );
}
