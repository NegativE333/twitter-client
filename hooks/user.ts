import { graphqlClient } from "@/clients/api"
import { getCurrentUserQuery, getUserByIdQuery } from "@/graphql/query/user"
import { useQuery } from "@tanstack/react-query"

export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: ['current-user'],
        queryFn: () => graphqlClient.request(getCurrentUserQuery)
    })

    return { ...query, user : query.data?.getCurrentUser };
};

export const useUserById = (id : string) => {
    const query = useQuery({
        queryKey: ['user-by-id'],
        queryFn: () => graphqlClient.request(getUserByIdQuery, {id: id})
    })

    return {...query, user: query.data?.getUserById};
}