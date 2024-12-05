import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-300 sticky top-0 z-10">
      <div className="flex-1">
        <div className="btn btn-ghost text-xl">
          <Link to="/">Product Store!</Link>
        </div>
      </div>
      <div className="flex-none">
        <Link to="/create">
          <button className="btn m-2 btn-outline">Add Product</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
