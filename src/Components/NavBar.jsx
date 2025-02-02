import { Cart } from "./Cart";
import { Avatar } from "./Avatar";
import AvatarPng from "../Assets/img/image-avatar.png";
import CartPng from "../Assets/img/icon-cart.svg";

import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";

import { CartProvider } from "./CartProvider";
import hamburgerMenu from "../Assets/img/icon-menu.svg";
import { HamburgerMenu } from "./HamburgerMenu";
import { CartDialog } from "./CartDialogBox";
import { WishlistProvider } from "./WishlistProvider";
import { ShoppingBagIcon } from "lucide-react";
import { Toaster } from "./ui/toaster";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeNav = ({ isActive }) =>
    isActive
      ? " border-b-4  border-orange-500 hover:border-orange-300 "
      : " rounded-lg px-2 py-2 hover:text-orange-300";

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="w-screen ">
          <nav className="max-w-7xl bg-white z-50 border-b sticky top-0 border-gray-200 sm:relative xl:mx-auto py-2 lg:px-28 sm:px-10 sm:py-8 sm:border-b-0 sm:shadow-sm sm:shadow-slate-300">
            <Toaster />
            <div className="flex items-center justify-between">
              {/* Left side with logo and navigation */}
              <div className="flex items-center md:flex-1 md:space-x-3 lg:space-x-6 xl:space-x-12">
                {/* Hamburger Menu */}
                <div
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="cursor-pointer mx-4 sm:hidden "
                >
                  <img src={hamburgerMenu} />
                </div>

                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? " text-gray-900  bg-orange-500 rounded-lg px-2 py-1 hover:bg-orange-300"
                      : " rounded-lg px-2 py-1 hover:bg-gray-300"
                  }
                  to="/"
                >
                  <span className="flex items-center space-x-2">
                    <h2 className="text-3xl font-bold font-kumbh sm:text-2xl md:text-3xl sm:tracking-tight ">
                      shopify
                    </h2>
                    <ShoppingBagIcon className="w-6 h-6" />
                  </span>
                </NavLink>

                {/* Navigation Links */}
                <div className="hidden tems-center font-kumbh font-normal sm:flex sm:space-x-4 space-x-8">
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
              <div className="flex mr-12 items-center cursor-pointer sm:space-x-2 sm:flex-shrink-0 sm:mr-6 space-x-4 md:space-x-4 lg:space-x-8">
                <Cart img={CartPng} />
                <Avatar img={AvatarPng} />
              </div>
            </div>
          </nav>
          {isMenuOpen && (
            <HamburgerMenu closeMenu={() => setIsMenuOpen(false)} />
          )}
          <CartDialog />
          <Outlet />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
};
