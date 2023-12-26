import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setBackBtn } from "../redux/actions";
import { useLocation } from "react-router-dom";

export default function BackBTN() {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();

  const handleGoBack = () => {
    window.history.back();
  };
  const handleResize = () => {
    setIsMobile(window.innerWidth < 640);
    dispatch(setBackBtn(true));
  };
  const isNotHomePage = window.location.pathname !== "/";
  useEffect(() => {
    handleResize();

    dispatch(setBackBtn(isNotHomePage));

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isNotHomePage, dispatch]);

  const back = useSelector((state) => state.store.backBtn);

  return (
    <div>
      {back && (
        <button
          className={`${
            !isMobile ? "fixed" : ""
          }  z-30 border rounded-md pl-1 ml-3 bg-gray-100 pr-1  flex items-center`}
          onClick={handleGoBack}
        >
          <FaArrowLeft className="text-xl" />
          <div className="hidden sm:block">Back</div>
        </button>
      )}
    </div>
  );
}
