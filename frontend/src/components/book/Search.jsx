import React from "react";
import { useLocation } from "react-router-dom";

export function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const newURL = `${location.pathname}?${searchParams}`;
  return <div>Search here</div>;
}
