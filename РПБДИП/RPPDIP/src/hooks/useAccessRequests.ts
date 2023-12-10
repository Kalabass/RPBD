import { useQuery } from "@tanstack/react-query";
import accessService from "../services/access.service";

export const useAccessRequests = () => {
    return useQuery({
        queryKey: ['accessesReqs'],
        queryFn: () => accessService.getAllREquests(),
        select: ({data}) => data
    })
}