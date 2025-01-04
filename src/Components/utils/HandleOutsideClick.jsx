import { createContext, useContext, useRef, useState } from "react";

const GlobalClickContext = createContext();

export const HandleOutsideClick = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRefs = useRef(new Set());
  const activeMenuRef = useRef(null);

  const registerMenu = (ref) => {
    menuRefs.current.add(ref);
    return () => menuRefs.current.delete(ref);
  };

  const closeAllMenu = () => {
    setIsMenuOpen(false);
    activeMenuRef.current = null;
  };

  const toggleMenu = (menuId) => {
    if (activeMenuRef.current === menuId && isMenuOpen) {
      closeAllMenu();
    } else {
      setIsMenuOpen(true);
      activeMenuRef.current = menuId;
    }
  };

  return (
    <GlobalClickContext.Provider
      value={{
        closeAllMenu,
        isMenuOpen,
        setIsMenuOpen,
        registerMenu,
        toggleMenu,
        activeMenuRef,
      }}
    >
      {children}
    </GlobalClickContext.Provider>
  );
};

export const useCloseMenu = () => {
  const context = useContext(GlobalClickContext);
  if (!context) {
    throw new Error("useCloseMenu must be within GlobalProvider");
  }
  return context;
};
