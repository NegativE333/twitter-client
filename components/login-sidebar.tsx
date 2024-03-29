"use client";

import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { UserCard } from "./user-card";

export const LoginSidebar = () => {

  const { user } = useCurrentUser();

  const queryClient = useQueryClient();
  

  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {

    const googleToken = cred.credential;

    if (!googleToken) return toast.error(`Google token not found.`);

    const { verifyGoogleToken } = await graphqlClient.request(verifyUserGoogleTokenQuery, { token: googleToken });

    toast.success("Verified Successfully");
    console.log(verifyGoogleToken);

    if (verifyGoogleToken) window.localStorage.setItem('__twitter_clone_token', verifyGoogleToken);

    await queryClient.invalidateQueries({ queryKey: ["current-user"] });

  }, [queryClient]);

  return (
    <div className="">
      {!user ? (
        <div className="p-5 bg-[#16181C] rounded-lg w-fit">
          <h1 className="my-2 text-xl">New to X?</h1>
          <GoogleLogin
            onSuccess={handleLoginWithGoogle}
          />
        </div>
      ) : (
        <div className="bg-[#16181C] rounded-xl">
          <h1 className="text-xl font-bold px-4 py-3">
            Who to follow
          </h1>
          <div className="flex flex-col">
            {user?.recommendedUsers?.map((el) => 
              <UserCard 
                key={el?.id}
                id={el?.id}
                firstName={el?.firstName}
                lastName={el?.lastName ? el.lastName : ''}
                email={el?.email}
                profileImageURL={el?.profileImageURL ? el.profileImageURL : ''}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}