// import { Collections } from "../Pages/Collections";
// import { Men } from "../Pages/Men";
// import { Women } from "../Pages/Women";
// import { About } from "../Pages/About";
// import { Contact } from "../Pages/Contact";
// import { Cart } from "./Cart";
// import { Avatar } from "./Avatar";
// import AvatarPng from "../Assets/img/image-avatar.png";
// import CartPng from "../Assets/img/icon-cart.svg";

// export const NavBar = () => {
//   return (
//     <nav className="flex items-center w-[76%] mx-[12%]">
//       <div className="flex justify-between w-[50%]  ">
//         <h2 className="font-bold lowercase ">SNEAKERS</h2>
//         <Collections />
//         <Men />
//         <Women />
//         <About />
//         <Contact />
//       </div>
//       <div className="inline-flex item-center justify-end w-[26%]">
//         <Cart img={CartPng} />
//         <Avatar img={AvatarPng} />
//       </div>
//       <hr className="rounded-lg block" />
//     </nav>
//   );
// };

import { Cart } from "./Cart";
import { Avatar } from "./Avatar";
import AvatarPng from "../Assets/img/image-avatar.png";
import CartPng from "../Assets/img/icon-cart.svg";
import { Outlet, NavLink } from "react-router-dom";
import { CartProvider } from "./CartProvider";
import { LoadingSpinner } from "./LoadingSpinner";
import { useState, useEffect } from "react";
import hamburgerMenu from "../Assets/img/icon-menu.svg";
import { HamburgerMenu } from "./HamburgerMenu";
import { HandleOutsideClick } from "./utils/HandleOutsideClick";

export const NavBar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeNav = ({ isActive }) =>
    isActive
      ? " border-b-4  border-orange-500 hover:border-orange-300 "
      : " hover:text-orange-300 rounded-lg px-2 py-2";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HandleOutsideClick>
      <CartProvider>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="w-screen ">
            <nav className="max-w-7xl bg-white z-50 border-b sticky sm:relative top-0 border-gray-200  xl:mx-auto py-2 lg:px-28  sm:px-10 sm:py-8  sm:border-b-0 sm:shadow-sm sm:shadow-slate-300">
              <div className="flex items-center  justify-between">
                {/* Left side with logo and navigation */}
                <div className="flex items-center md:flex-1 md:space-x-3 lg:space-x-6 xl:space-x-12">
                  {/* Hamburger Menu */}
                  <div
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="sm:hidden cursor-pointer mx-4"
                  >
                    <img src={hamburgerMenu} />
                  </div>

                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? " text-gray-900  bg-orange-500 hover:bg-orange-300 rounded-lg px-2  py-1"
                        : "hover:bg-gray-300 rounded-lg px-2  py-1"
                    }
                    to="/"
                  >
                    <h2 className="text-3xl sm:text-2xl md:text-3xl font-bold font-kumbh sm:tracking-tight ">
                      sneakers
                    </h2>
                  </NavLink>

                  {/* Navigation Links */}
                  <div className="hidden sm:flex items-center font-kumbh font-normal  sm:space-x-4 space-x-8">
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

                {/* Right side with cart and avatar */}
                <div className="flex sm:flex-shrink-0 items-center cursor-pointer sm:space-x-2 sm:mr-6 space-x-4 mr-12  md:space-x-4 lg:space-x-8">
                  <Cart img={CartPng} />
                  <Avatar img={AvatarPng} />
                </div>
              </div>
            </nav>
            {isMenuOpen && (
              <HamburgerMenu closeMenu={() => setIsMenuOpen(false)} />
            )}
            <Outlet />
          </div>
        )}
      </CartProvider>
    </HandleOutsideClick>
  );
};
