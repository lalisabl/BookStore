import { BiSearch } from "react-icons/bi";
import { BookGrid } from "../book/BookGrid";
import GetBooks from "../book/getBooks";
import { useEffect, useRef, useState } from "react";
import { FaSortDown } from "react-icons/fa";

export default function UserHome() {
  return (
    <div>
      <HomeBanner />
    </div>
  );
}

export function HomeBanner() {

  return (
    <>
      <div className="home-banner">
        <div className="p-10 m-auto justify-center w-full flex">
          <div className="flex items-center">
            <form className="flex relative">
              
              <span className="flex items-center">
                <input
                  className="p-3 border rounded border-gray-300"
                  type="text"
                  title="text"
                  placeholder="Search book here"
                />
                <button className="p-3 bg-blue-500 text-white rounded-r-md">
                  Search
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
      <Recommended />
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
