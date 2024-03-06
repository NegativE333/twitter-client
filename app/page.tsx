"use client";

import { BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitterX } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { graphql } from "@/gql";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
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

export default function Home() {

  const {user} = useCurrentUser();
  const queryClient = useQueryClient();

  console.log(user);
  
  const handleLoginWithGoogle = useCallback(async (cred : CredentialResponse) => {
    
    const googleToken = cred.credential;

    if(!googleToken) return toast.error(`Google token not found.`);

    const {verifyGoogleToken} = await graphqlClient.request(verifyUserGoogleTokenQuery, {token: googleToken});

    toast.success("Verified Successfully");
    console.log(verifyGoogleToken);

    if(verifyGoogleToken) window.localStorage.setItem('__twitter_clone_token', verifyGoogleToken);

    await queryClient.invalidateQueries({queryKey : ["current-user"]});

  }, [queryClient]);

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen pl-24">
        <div className="col-span-3 pt-1 pl-20 relative">
          <div className="text-2xl hover:bg-gray-800 h-fit w-fit p-4 rounded-full cursor-pointer transition-all">
            <BsTwitterX className=""/>
          </div>
          <div className="mt-2 text-xl pr-4">
            <ul>
              {sidebarMenuItems.map((item, i) => (
                <li key={i} className="flex justify-start items-center gap-3 hover:bg-gray-800 rounded-full px-4 py-2 w-fit cursor-pointer mt-2">
                  <span>
                    {item.icon}
                  </span>
                  <span>
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 px-3">
              <button className="bg-[#1d9bf0] font-semibold p-2 rounded-full w-full text-[17px]">
                Post
              </button>
            </div>
          </div>
          {user && (
            <div className="absolute bottom-5 flex gap-3 items-center hover:bg-[#181818] py-2 px-3 rounded-full transition">
              {user.profileImageURL && 
                <Image 
                  src={user?.profileImageURL}
                  alt="User Profile"
                  height={50}
                  width={50}
                  className="rounded-full"
                />
              }
              <div className="flex flex-col gap-1 w-[90%]">
                <h3 className="font-semibold">
                  {user.firstName} {user.lastName}
                </h3>
                <h3 className="text-xs truncate w-[90%]">
                  {user.email} the
                </h3>
              </div>
              <div className="ml-auto cursor-pointer absolute right-2">
                <FiMoreHorizontal className="text-xl"/>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-5 border-r-[1px] border-l-[1px] border-gray-600 h-screen overflow-scroll overflow-x-hidden no-scrollbar">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3 p-5">
          {!user ? (
            <div className="p-5 bg-slate-700 rounded-lg w-fit">
              <h1 className="my-2 text-xl">New to X?</h1>
              <GoogleLogin
                onSuccess={handleLoginWithGoogle}
              />
            </div>
          ) : (
            <div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
