"use client";

import { BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitterX } from "react-icons/bs";
import { IoSearch, IoImageOutline } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";


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
  const {tweets = []} = useGetAllTweets();
  const {mutate} = useCreateTweet();
  
  const [content, setContent] = useState('');

  const queryClient = useQueryClient();

  const handleSelectImg = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*')
    input.click();
  }, []);

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    })
  }, [content, mutate]);
  
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
                <li key={i} className="flex justify-start items-center gap-3 hover:bg-[#181818] rounded-full px-4 py-2 w-fit cursor-pointer mt-2 transition">
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
          <div>
            <div className="border border-r-0 border-b-0 border-l-0 border-gray-600 p-5 transition-all h-fit">
              <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-1">
                    {user?.profileImageURL && (
                      <Image 
                          src={user?.profileImageURL}
                          alt="image"
                          height={50}
                          width={50}
                          className="rounded-full"
                      />
                    )}
                  </div>
                  <div className="col-span-11 text-center">
                      <textarea 
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="w-full bg-transparent focus:outline-none text-lg font-medium border-b border-slate-700"
                        placeholder="What is happening?!"
                      >

                      </textarea>
                  </div>
              </div>
              <div className="h-[5vh] flex items-center justify-center">
                <div 
                  onClick={handleSelectImg}
                  className="ml-12 flex items-center cursor-pointer"
                >
                  <IoImageOutline className="text-xl text-[#1A8CD8]"/>
                </div>
                <div className="ml-auto mt-1">
                  <button 
                    onClick={handleCreateTweet}
                    className="bg-[#1A8CD8] px-4 py-2 rounded-full font-bold"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
          {tweets?.map(tweet => tweet ? (
            <FeedCard 
              data={tweet as Tweet}
              key={tweet?.id}
            />
          ) : null)}
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
