import { ProfileMenuItems } from "@/Profile/ProfileMenuItems";
import { useState } from "react";

export const Avatar = ({ img }) => {
  const [isOpen, setIsOpen] = useState(false);

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
              <h3 className="font-bold font-kumbh">Oyeleke Victor</h3>
              <p className="text-sm text-blue-darkGrayish">
                victor123@gmail.com
              </p>
            </div>
          </div>
          <div className=" py-1">
            {ProfileMenuItems.map((item, index) => (
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
