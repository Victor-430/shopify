import { NavLink } from "react-router-dom";
import closeMenu from "../Assets/img/icon-close.svg";
import { useState, useContext, createContext, useEffect, useRef } from "react";

const HamburgerContext = createContext();

export const HamburgerMenu = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const activeNav = ({ isActive }) =>
    isActive
      ? " border-b-4 w-2/5 border-orange-500 hover:border-orange-300 "
      : " hover:text-orange-300 rounded-lg px-2 py-2";
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMenuOpen]);

  return (
    <>
      {isMenuOpen && (
        <div className=" sm:hidden fixed top-0 left-0 z-50 w-full h-screen bg-black bg-opacity-75">
          <div ref={menuRef} className="md:hidden  h-screen w-64 bg-white ">
            <div className="p-6 space-y-10">
              <img
                className="cursor-pointer "
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                src={closeMenu}
                alt="close menu"
              />

              {/* Navigation Links */}
              <div className="flex flex-col font-medium text-left">
                <NavLink className={activeNav} to="/collections">
                  Collections
                </NavLink>
                <NavLink className={activeNav} to="/men">
                  Men
                </NavLink>
                <NavLink className={activeNav} to="/women">
                  Women
                </NavLink>
                <NavLink className={activeNav} to="/about">
                  About
                </NavLink>
                <NavLink className={activeNav} to="/contact">
                  Contact
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
      <HamburgerContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
        {children}
      </HamburgerContext.Provider>
    </>
  );
};

export const useBurgerMenu = () => {
  const context = useContext(HamburgerContext);
  if (!context) {
    throw new Error("UseBurgerMenu must be within a HamburgerMenu provider");
  }
  return context;
};
