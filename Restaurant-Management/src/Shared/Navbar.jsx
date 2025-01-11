import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdMenu, IoMdClose, IoMdMoon, IoMdSunny } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthProvider/AuthProvier";

function Navbar() {
  const { user, logOut, setUser } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [activeButton, setActiveButton] = useState("/");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navbar = [
    { title: "Home", link: "/" },
    { title: "All Foods", link: "/allFoods" },
    { title: "Gallery", link: "/gallery" },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Logged Out",
          showConfirmButton: false,
          timer: 1500,
        });
        setUser(null);
        setActiveButton("/login");
        navigate("/login");
      })
      .catch((error) => console.error("Logout Error:", error.message));
  };

  return (
    <nav className={`py-4 px-6 bg-gray-900 text-yellow-200`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center text-2xl font-bold text-yellow-400">
          <span className="text-3xl">👨‍🍳</span>
         <Link to={`/`}> <span className="text-3xl font-lobster ml-2">ServeMate</span></Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navbar.map((item, index) => (
           <NavLink
           to={item.link}
           key={index}
           className={({ isActive }) =>
             `py-2 px-4 rounded-full transition-all duration-300 ${
               isActive
                 ? "bg-yellow-600 text-white shadow-lg"
                 : "text-yellow-400 hover:bg-yellow-600 hover:text-white"
             }`
           }
         >
           {item.title}
         </NavLink>
         
          ))}

          {user ? (
            <div className="relative flex items-center gap-4">
              {/* User Dropdown */}
              <div
                className="relative cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  referrerPolicy="no-referrer"
                  src={user?.photoURL}
                  alt="User Profile"
                  className="h-10 w-10 rounded-full border-2 border-yellow-400"
                />
                {dropdownOpen && (
                  <ul className="absolute top-12 right-0 bg-gray-800 text-yellow-200 shadow-lg py-2 px-3 w-44 rounded-lg z-10">
                    <li>
                      <NavLink
                        to="/myFoods"
                        className="block py-2 px-3 hover:bg-gray-700 rounded"
                        onClick={() => setActiveButton("/myFoods")}
                      >
                        My Foods
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/addFood"
                        className="block py-2 px-3 hover:bg-gray-700 rounded"
                        onClick={() => setActiveButton("/addFood")}
                      >
                        Add Food
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/myOrders"
                        className="block py-2 px-3 hover:bg-gray-700 rounded"
                        onClick={() => setActiveButton("/myOrders")}
                      >
                        My Orders
                      </NavLink>
                    </li>
                  </ul>
                )}
                <FaCaretDown className="absolute right-2 bottom-0 text-yellow-400" />
              </div>
              <button
                onClick={handleLogOut}
                className="py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
              >
                Log Out
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className={`py-2 px-4 rounded-full transition-all duration-300 ${
                activeButton === "/login"
                  ? "bg-yellow-600 text-white shadow-lg"
                  : "text-yellow-400 hover:bg-yellow-600 hover:text-white"
              }`}
              onClick={() => setActiveButton("/login")}
            >
              Login
            </NavLink>
          )}

          <button
            onClick={toggleDarkMode}
            className="text-yellow-400 text-2xl ml-4 hover:text-white transition-all duration-300"
          >
            {darkMode ? <IoMdSunny /> : <IoMdMoon />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-2xl text-yellow-400"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            className="fixed top-0 left-0 h-full w-4/5 bg-gray-900 text-white z-50 shadow-lg"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
          >
            <div className="p-6 flex flex-col gap-4">
              {navbar.map((item, index) => (
               <NavLink
               to={item.link}
               key={index}
               className={({ isActive }) =>
                 `py-2 px-4 rounded-full transition-all duration-300 ${
                   isActive
                     ? "bg-yellow-600 text-white shadow-lg"
                     : "text-yellow-400 hover:bg-yellow-600 hover:text-white"
                 }`
               }
             >
               {item.title}
             </NavLink>             
              ))}

              {user ? (
                <>
                  <NavLink
                    to="/myFoods"
                    className={`block py-2 px-4 rounded-full transition-all duration-300 ${
                      activeButton === "/myFoods"
                        ? "bg-yellow-600 text-white shadow-lg"
                        : "hover:bg-yellow-600 hover:text-white"
                    }`}
                    onClick={() => {
                      setActiveButton("/myFoods");
                      setToggle(false);
                    }}
                  >
                    My Foods
                  </NavLink>
                  <NavLink
                    to="/addFood"
                    className={`block py-2 px-4 rounded-full transition-all duration-300 ${
                      activeButton === "/addFood"
                        ? "bg-yellow-600 text-white shadow-lg"
                        : "hover:bg-yellow-600 hover:text-white"
                    }`}
                    onClick={() => {
                      setActiveButton("/addFood");
                      setToggle(false);
                    }}
                  >
                    Add Food
                  </NavLink>
                  <NavLink
                    to="/myOrders"
                    className={`block py-2 px-4 rounded-full transition-all duration-300 ${
                      activeButton === "/myOrders"
                        ? "bg-yellow-600 text-white shadow-lg"
                        : "hover:bg-yellow-600 hover:text-white"
                    }`}
                    onClick={() => {
                      setActiveButton("/myOrders");
                      setToggle(false);
                    }}
                  >
                    My Orders
                  </NavLink>
                  <button
                    onClick={handleLogOut}
                    className="py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className={`block py-2 px-4 rounded-full transition-all duration-300 ${
                    activeButton === "/login"
                      ? "bg-yellow-600 text-white shadow-lg"
                      : "hover:bg-yellow-600 hover:text-white"
                  }`}
                  onClick={() => {
                    setActiveButton("/login");
                    setToggle(false);
                  }}
                >
                  Login
                </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
