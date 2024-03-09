"use client";

import { BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitterX } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { FaFeatherAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";

interface TwitterSidebarButton {
    title: string;
    icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
    {
      title: "Home",
      icon: <AiFillHome />
    },
    {
      title: "Explore",
      icon: <IoSearch />
    },
    {
      title: "Notifications",
      icon: <BsBell />
    },
    {
      title: "Messages",
      icon: <BsEnvelope />
    },
    {
      title: "Bookmarks",
      icon: <BsBookmark />
    },
    {
      title: "Profile",
      icon: <BiUser />
    }
  ]

export const Sidebar = () => {

    const {user} = useCurrentUser();

    return(
        <>
          <div className="text-2xl hover:bg-gray-800 h-fit w-fit p-4 rounded-full cursor-pointer transition-all">
            <BsTwitterX className=""/>
          </div>
          <div className="mt-2 text-xl pr-4">
            <ul>
              {sidebarMenuItems.map((item, i) => (
                <li key={i} className="flex justify-start items-center gap-3 hover:bg-[#181818] rounded-full px-4 py-2 w-fit cursor-pointer mt-2 transition">
                  <span>
                    {item.icon}
                  </span>
                  <span className="hidden sm:inline">
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 px-3 w-full">
              <button className="bg-[#1d9bf0] font-semibold p-2 rounded-full w-full text-[17px]">
                <span className="hidden sm:inline">Post</span>
                <FaFeatherAlt className="sm:hidden"/>
              </button>
            </div>
          </div>
          {user && (
            <div className="absolute bottom-2 sm:bottom-5 flex gap-3 items-center hover:bg-[#181818] px-1 m-2 sm:py-2 sm:px-3 sm:mr-2 rounded-full transition">
              {user.profileImageURL && 
                <Image 
                  src={user?.profileImageURL}
                  alt="User Profile"
                  height={50}
                  width={50}
                  className="rounded-full"
                />
              }
              <div className="hidden sm:flex flex-col gap-1 w-[90%]">
                <h3 className="font-semibold">
                  {user.firstName} {user.lastName}
                </h3>
                <h3 className="text-xs truncate w-[90%]">
                  {user.email}
                </h3>
              </div>
              <div className="hidden sm:inline ml-auto cursor-pointer absolute right-2">
                <FiMoreHorizontal className="text-xl"/>
              </div>
            </div>
          )}
        </>
    )
}