"use client";

import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import toast from "react-hot-toast";

export const LoginSidebar = () => {

    const {user} = useCurrentUser();

    const queryClient = useQueryClient();

    const handleLoginWithGoogle = useCallback(async (cred : CredentialResponse) => {
    
        const googleToken = cred.credential;
    
        if(!googleToken) return toast.error(`Google token not found.`);
    
        const {verifyGoogleToken} = await graphqlClient.request(verifyUserGoogleTokenQuery, {token: googleToken});
    
        toast.success("Verified Successfully");
        console.log(verifyGoogleToken);
    
        if(verifyGoogleToken) window.localStorage.setItem('__twitter_clone_token', verifyGoogleToken);
    
        await queryClient.invalidateQueries({queryKey : ["current-user"]});
    
      }, [queryClient]);

    return(
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
    )
}