import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import { apiurl } from "../../assets/constData";

export function SearchBooks({ query }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const newURL = `${location.pathname}?${searchParams}`;

  useEffect(() => {
    setLoading(true);
    navigate(newURL);
    axios
      .get(`${apiurl}/books/get?${searchParams}`)
      .then((response) => {
        setProducts(response.data.data.Products);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }, [newURL]);
  return <></>;
}
