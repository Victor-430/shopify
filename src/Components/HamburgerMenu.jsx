import { NavLink } from "react-router-dom";
import closeSideMenu from "../Assets/img/icon-close.svg";
import { useState, useEffect, useRef } from "react";

export const HamburgerMenu = ({ closeMenu }) => {
  const [startX, setStartX] = useState(null);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(-100);

  const activeNav = ({ isActive }) =>
    isActive
      ? " border-b-4 w-2/5 border-orange-500 hover:border-orange-300 "
      : "rounded-lg px-2 py-2 hover:text-orange-300";
  const menuRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      setTranslateX(0);
    });
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleClose = () => {
    setTranslateX(-100);
    setTimeout(closeMenu, 300);
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    setCurrentX(e.touches[0].clientX);
    const diff = ((e.touches[0].clientX - startX) / window.innerWidth) * 100;

    if (diff <= 0) {
      setTranslateX(diff);
    }
  };

  const handleTouchEnd = () => {
    const diff = currentX - startX;
    const swipeThreshold = window.innerWidth * 0.2;

    if (diff < -swipeThreshold) {
      handleClose();
    } else if (diff > swipeThreshold) {
      setTranslateX(0);
    } else {
      const currentTranslate = ((currentX - startX) / window.innerWidth) * 100;
      if (currentTranslate < -20) {
        handleClose();
      } else {
        setTranslateX(0);
      }
    }
  };

  return (
    <div
      style={{ opacity: (translateX + 100) / 100 }}
      className="fixed inset-0 z-50 bg-black/50 bg-opacity-75 transition-opacity duration-300 sm:hidden"
    >
      <div
        ref={menuRef}
        className="fixed top-0 left-0 h-screen w-2/3 bg-white transition-transform duration-300 ease-out touch-pan-x md:hidden"
        style={{ transform: `translateX(${translateX}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="p-6 space-y-10">
          <button onClick={handleClose}>
            <img src={closeSideMenu} alt="close menu" />
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col font-medium font-kumbh text-left">
            <NavLink
              onClick={handleClose}
              className={activeNav}
              to="/collections"
            >
              Collections
            </NavLink>
            <NavLink onClick={handleClose} className={activeNav} to="/men">
              Men
            </NavLink>
            <NavLink onClick={handleClose} className={activeNav} to="/women">
              Women
            </NavLink>
            <NavLink onClick={handleClose} className={activeNav} to="/about">
              About
            </NavLink>
            <NavLink onClick={handleClose} className={activeNav} to="/contact">
              Contact
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};
