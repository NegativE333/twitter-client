"use client";

import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { useCurrentUser } from "@/hooks/user"
import Image from "next/image";
import { useCallback, useState } from "react";
import { IoImageOutline } from "react-icons/io5";


export const CreateTweet = () => {

    const {user} = useCurrentUser();
    const {mutate} = useCreateTweet();

    
    const [content, setContent] = useState('');
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

    return(
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
    )
}