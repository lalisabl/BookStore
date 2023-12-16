import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DropdownButton({ buttonTitle, dropDownContent }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  const handleToggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };
  const handleClose = () => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={buttonRef}>
      <button
        id="dropdownDefaultButton"
        className="font-medium text-md py-2.5 text-center inline-flex items-center"
        type="button"
        onMouseOver={handleToggleDropdown}
        onClick={handleToggleDropdown}
      >
        {buttonTitle}
        <svg
          className="w-2.5 h-2.5 ms-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {dropdownVisible && (
        <div
          id="dropdown"
          className="z-10 fixed bg-white divide-gray-100 rounded-lg shadow-md min-w-max dark:bg-gray-100"
        >
          <ul className="py-2 text-sm cursor-pointer select-none">
            {dropDownContent?.map((element) => (
              <li
                key={element.title}
                onClick={() => {
                  handleClose();
                  navigate(element.link);
                }}
                className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-200 dark:hover:text-gray-700"
              >
                {element.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
