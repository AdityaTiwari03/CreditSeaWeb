import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaTachometerAlt,
  FaMoneyBill,
  FaCreditCard,
} from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg p-4">
      <div className="flex justify-between items-center container mx-auto">
        <h1 className="text-lg font-bold">CREDIT APP</h1>
        {/* Navigation Links */}
        <div
          className="flex space-x-4 mb-2"
          style={{ width: "500px", justifyContent: "space-between" }}
        >
          <Link to="/" className="flex items-center text-green-500 ">
            <FaHome className="icon-large h-7 w-7 mr-2" />
            Home
          </Link>
          <Link to="/Dashboard" className="flex items-center text-green-500">
            <FaTachometerAlt className="icon-large h-7 w-7 mr-2" />
            Dashboard
          </Link>
          <Link to="/" className="flex items-center text-green-500">
            <FaMoneyBill className="icon-large h-7 w-7 mr-2" />
            Budget
          </Link>
          <Link to="/" className="flex items-center text-green-500">
            <FaCreditCard className="icon-large h-7 w-7 mr-2" />
            Card
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
