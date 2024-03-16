import { graphqlClient } from "@/clients/api";
import { followUserMutation } from "@/graphql/mutations/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image"
import { useCallback } from "react";

interface UserCardProps{
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    profileImageURL?: string;
}

export const UserCard = ({
    id,
    firstName,
    lastName,
    email,
    profileImageURL
} : UserCardProps) => {

    const queryClient = useQueryClient();
    
    const handleFollowUser = useCallback(async () => {
        if (!id) return;
        await graphqlClient.request(followUserMutation, { to: id })
        await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    }, [id, queryClient]);

    return (
        <div className="flex gap-2 hover:bg-[#1D1F23] transition p-3">
            {profileImageURL && (
                <Image 
                    src={profileImageURL}
                    width={40}
                    height={40}
                    alt="profile"
                    className="rounded-full"
                />
            )}
            <div className="flex flex-col">
                <h3 className="font-bold">
                    {firstName} {lastName}
                </h3>
                <p className="text-sm">
                    {email}
                </p>
            </div>
            <div>
                <button 
                    onClick={handleFollowUser}
                    className="bg-white p-1 rounded-full px-2 text-black font-semibold transition hover:bg-white/90"
                >
                    Follow
                </button>
            </div>
        </div>
    )
}