import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary h-[8vh]">
      <div className="container-fluid">
        <div
          className="navbar-brand text-2xl"
          style={{ cursor: "pointer" }}
          onClick={() => handleNavigate("/")}
          role="button"
          tabIndex={0}
        >
          Vehicle Rental App
        </div>

      </div>
    </nav>
  );
}
