// src/UserProfile.js
import React from "react";
import { useAuth } from "./AuthContext";

function UserProfile() {
  const { user } = useAuth();

  return user ? (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  ) : (
    <p>No user logged in</p>
  );
}

export default UserProfile;
