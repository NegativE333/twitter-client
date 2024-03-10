import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
    #graphql
    query VerifyUserGoogleToken($token: String!){
        verifyGoogleToken(token: $token)
    }`
)

export const getCurrentUserQuery = graphql(`
    query GetCurrentUser{
        getCurrentUser{
            id
            profileImageURL
            email
            firstName
            lastName
            createdAt
            tweets {
                id
                content
                author{
                    firstName
                    lastName
                    profileImageURL
                }
            }
        }
    }
`);

export const getUserByIdQuery = graphql(`#graphql
    query GetUserById($id : ID!){
        getUserById(id: $id){
            id
            firstName
            lastName
            email
            profileImageURL
            createdAt
            tweets{
                content
                id
                author{
                    firstName
                    lastName
                    profileImageURL
                }
            }
        }
    }
`)