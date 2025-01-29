import { getAuth, signOut } from "firebase/auth";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProfileMenuItems } from "@/Profile/ProfileMenuItems";


export const Avatar = ({ img }) => {
  // const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("Error Sigining Out");
    }
  };

  if (!user) {
  return null
  }

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        <img
          className={`w-[2.5rem] h-[2.5rem] rounded-full transition-all ${
            isOpen ? "ring-2 ring-orange-500" : ""
          }`}
          src={img}
          alt="avatar"
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg borger-gray-200 z-50">
          <div className="flex items-center p-4 border-b border-gray-200 ">
            <img
              className="w-12 h-12 rounded-full mr-4"
              src={img}
              alt="avatar"
            />
            <div>
              <h3 className="font-bold font-kumbh">
                {user.displayName ? user.displayName.toUpperCase() : "User"}
              </h3>
              <p className="text-sm text-blue-darkGrayish">{user.email}</p>
            </div>
          </div>
          <div className=" py-1">
            {ProfileMenuItems(handleSignout, navigate).map((item, index) => (
              <div
                key={index}
                onClick={item.action}
                className={`flex items-center px-4 py-2 hover:bg-blue-lightGrayish cursor-pointer ${
                  item.className || ""
                } `}
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
