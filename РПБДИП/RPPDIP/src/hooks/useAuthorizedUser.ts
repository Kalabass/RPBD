import { useQuery } from "@tanstack/react-query";
import usersService from "../services/users.service";

export const useAuthUser = () => {
    return useQuery({
        queryKey: ['auth', 'user'],
        queryFn: () => usersService.GetByToken(),
        select: ({data}) => data
    })
}