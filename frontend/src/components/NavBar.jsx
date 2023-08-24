import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-6">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="text-white font-bold text-xl">
            <Link to="/" className="text-white hover:text-gray-300">
              TaskManager
            </Link>
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">
                Listing
              </Link>
            </li>
            <li>
              <Link
                to="/create-task"
                className="text-white hover:text-gray-300"
              >
                Create Task
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
