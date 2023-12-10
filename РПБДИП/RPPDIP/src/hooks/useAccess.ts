import { useQuery } from "@tanstack/react-query";
import accessService from "../services/access.service";

export const useAccess = (id: number) => {
    return useQuery({
        queryKey: ['accesses'],
        queryFn: () => accessService.getAllById(id),
        select: ({data}) => data
    })
}