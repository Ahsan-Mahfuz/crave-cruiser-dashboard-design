import { FaUsers, FaUserPlus } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { FaUserGear } from "react-icons/fa6";
import { MdDashboard, MdOutlineSettings } from "react-icons/md";

import craveCrusherlogo from "../../../../public/crave-crusher-logo.svg";
import { GrPlan } from "react-icons/gr";
import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const Sidebar = () => {
  const location = useLocation();
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const settings = [
    {
      name: "Privacy Policy",
      link: "/privacy-policy",
    },

    {
      name: "Terms & condition",
      link: "/terms-and-condition",
    },

    { name: "Profile Settings", link: "/profile" },
    { name: "Log out", link: "/login" },
  ];

  const dashBoard = {
    name: "Dashboard",
    link: "/",
    icon: <MdDashboard />,
  };

  const menuItems = [
    {
      name: "Subscriptions Plan",
      link: "/subscription-plan",
      icon: <GrPlan />,
    },
    {
      name: "Support",
      link: "/support",
      icon: <FaUserGear />,
    },
    {
      name: "Make Admin",
      link: "/make-admin",
      icon: <FaUserPlus />,
    },
  ];
  const isUserManagementActive = location.pathname.includes("/user-management");
  const isSettingsActive = location.pathname.includes("/settings");

  return (
    <div className=" w-[300px] h-[96vh] overflow-y-scroll px-3">
      <div>
        <img src={craveCrusherlogo} alt="car-verification-icon" />
      </div>

      <ul className="mt-10">
        {/* Dashboard */}
        <NavLink
          to={dashBoard?.link}
          className={({ isActive }) =>
            `flex items-center py-3 rounded-3xl my-1 pl-6 hover:bg-gray-400 cursor-pointer hover:text-white ${
              isActive ? "bg-gray-600 text-white" : ""
            }`
          }
        >
          <span className="mr-4 text-xl">{dashBoard.icon}</span>
          <span>{dashBoard.name}</span>
        </NavLink>

        {/* User Management */}
        <li className="my-1">
          <div
            className={`flex items-center justify-between py-3 rounded-3xl pl-6 cursor-pointer ${
              isUserManagementActive
                ? "!bg-gray-600 !text-white"
                : "hover:bg-gray-400 hover:text-white"
            }`}
            onClick={() => setIsUserManagementOpen(!isUserManagementOpen)}
          >
            <div className="flex items-center">
              <span className="mr-4 text-xl">
                <FaUsers />
              </span>
              <span>User Management</span>
            </div>
            <span className="mr-4">
              {isUserManagementOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
            </span>
          </div>
        </li>

        {/* Remaining menu items */}
        {menuItems.map((item, index) => (
          <NavLink
            to={item?.link}
            key={`remaining-${index}`}
            className={({ isActive }) =>
              `flex items-center py-3 rounded-3xl my-1 pl-6 hover:bg-gray-400 cursor-pointer hover:text-white ${
                isActive ? "bg-gray-600 text-white" : ""
              }`
            }
          >
            <span className="mr-4 text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}

        {/* Settings */}
        <li className="my-1">
          <div
            className={`flex items-center justify-between py-3 rounded-3xl pl-6 cursor-pointer ${
              isSettingsActive
                ? "!bg-gray-600 !text-white"
                : "hover:bg-gray-400 hover:text-white"
            }`}
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <div className="flex items-center">
              <span className="mr-4 text-xl">
                <MdOutlineSettings />
              </span>
              <span>Settings</span>
            </div>
            <span className="mr-4">
              {isSettingsOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
            </span>
          </div>

          {isSettingsOpen && (
            <div className="ml-4">
              {settings.map((subItem, idx) => (
                <NavLink
                  key={idx}
                  to={subItem.link}
                  className={({ isActive }) =>
                    `flex items-center py-2 px-6 my-1 rounded-xl hover:bg-[#6C63FF] hover:text-white 
                      ${isActive ? "bg-[#6C63FF] text-white" : "bg-[#d6d4fc]"}`
                  }
                >
                  <span className="ml-6">{subItem.name}</span>
                </NavLink>
              ))}
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
