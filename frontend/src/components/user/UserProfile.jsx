import React from "react";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { username } = useParams();
  return <div>hello {username}</div>;
}
