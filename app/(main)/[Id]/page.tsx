"use client";

import FeedCard from "@/components/feed-card";
import { Tweet } from "@/gql/graphql";
import { useCurrentUser, useUserById } from "@/hooks/user";
import Image from "next/image";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { useCallback, useMemo } from "react";
import { graphqlClient } from "@/clients/api";
import { followUserMutation, unfollowUserMutation } from "@/graphql/mutations/user";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

interface UserIdProps {
    params: { Id: string }
}

const UserId = ({
    params
}: UserIdProps) => {

    const { user } = useUserById(params.Id);
    const { user: currUser } = useCurrentUser();
    const queryClient = useQueryClient();

    const amIFollowing = useMemo(() => {
        if (!user) return false;
        return (user.followers?.findIndex(el => el?.id === currUser?.id) ?? -1) >= 0
    }, [currUser?.id, user]);

    const handleFollowUser = useCallback(async () => {
        if (!user?.id) return;
        await graphqlClient.request(followUserMutation, { to: user?.id })
        await queryClient.invalidateQueries({ queryKey: ["user-by-id"] });
    }, [user?.id, queryClient]);

    const handleUnfollowUser = useCallback(async () => {
        if(!user?.id) return;
        await graphqlClient.request(unfollowUserMutation, {to : user?.id})
        await queryClient.invalidateQueries({queryKey: ["user-by-id"]});
    },[user?.id, queryClient]);

    return (
        <div className="">
            <nav className="flex items-center gap-4 py-1 pl-2 fixed bg-black/70 w-full">
                <Link href='/'>
                    <BsArrowLeftShort className="text-3xl" />
                </Link>
                <div>
                    <h1 className="text-xl font-semibold">
                        {user?.firstName} {user?.lastName}
                    </h1>
                    <p className="text-xs text-[#b6babd] mt-[1px]">
                        {user?.tweets?.length} posts
                    </p>
                </div>
            </nav>
            <div className="p-4 border-b border-[#282b2e] pt-16">
                <div className="flex">
                    {user?.profileImageURL && (
                        <Image
                            src={user?.profileImageURL}
                            alt="profile image"
                            height={90}
                            width={90}
                            className="rounded-full"
                        />
                    )}
                    {currUser?.id !== user?.id && (
                        <>
                            {
                                amIFollowing ? (
                                    <div className="ml-auto">
                                        <button 
                                            onClick={handleUnfollowUser}
                                            className="py-2 px-4 rounded-full border-2 border-white font-semibold transition w-28 group hover:bg-[#190305] hover:border-red-600">
                                            <span
                                                className="hidden group-hover:inline text-red-600"
                                            >
                                                Unfollow
                                            </span>
                                            <span
                                                className="group-hover:hidden"
                                            >
                                                Following
                                            </span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="ml-auto">
                                        <button
                                            onClick={handleFollowUser} 
                                            className="bg-white py-2 px-4 rounded-full text-black font-semibold  hover:bg-white/90 transition">
                                            Follow
                                        </button>
                                    </div>
                                )
                            }
                        </>
                    )}
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-xl font-bold mt-4">
                            {user?.firstName} {user?.lastName}
                        </h1>
                        <p className="text-sm text-[#71767B]">
                            {user?.email}
                        </p>
                        <div className="mt-2 flex gap-4">
                            <p className="text-[#71767B]">
                                <b className="text-white">
                                    {user?.following?.length}
                                </b> Following
                            </p>
                            <p className="text-[#71767B]">
                                <b className="text-white">
                                    {user?.followers?.length}
                                </b> Followers
                            </p>
                        </div>
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