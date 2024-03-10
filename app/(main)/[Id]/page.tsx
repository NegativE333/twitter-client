"use client";

import FeedCard from "@/components/feed-card";
import { Tweet } from "@/gql/graphql";
import { useCurrentUser, useUserById } from "@/hooks/user";
import Image from "next/image";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";
import { useQuery } from "@tanstack/react-query";

interface UserIdProps{
    params: { Id : string }
}

const UserId = ({
    params
} : UserIdProps) => {

    const { user } = useUserById(params.Id);
    
    return (  
        <div>
            <nav className="flex items-center gap-4 mt-1 ml-2">
                <BsArrowLeftShort className="text-3xl"/>
                <div>
                    <h1 className="text-xl font-semibold">
                        Om Tekade
                    </h1>
                    <p className="text-xs text-[#868a8e]">
                        26 posts
                    </p>
                </div>
            </nav>
            <div className="p-4 border-b border-[#282b2e]">
                {user?.profileImageURL && (
                    <Image 
                        src={user?.profileImageURL}
                        alt="profile image"
                        height={90}
                        width={90}
                        className="rounded-full"
                    />
                )}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-xl font-bold mt-4">
                                {user?.firstName} {user?.lastName}
                        </h1>
                        <p className="text-sm text-[#71767B]">
                            {user?.email}
                        </p>
                    </div>
                    <div className="sm:ml-auto">
                        {user?.createdAt && 
                            <div className="flex gap-2 items-center text-[#71767B] text-md">
                                <FaRegCalendarAlt />
                                Joined
                                {format(new Date(user.createdAt), " MMMM yyyy")}
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div>
                {user?.tweets?.map(tweet =>
                    <FeedCard 
                        key={tweet?.id}
                        data={tweet as Tweet}
                    />
                )}
            </div>
        </div>
    );
}

export default UserId;