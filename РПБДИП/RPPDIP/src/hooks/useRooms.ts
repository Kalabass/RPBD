import { useQuery } from "@tanstack/react-query";
import roomsService from "../services/rooms.service";

export const useRooms = () => {
    return useQuery({
        queryKey: ['rooms'],
        queryFn: () => roomsService.getAll(),
        select: ({data}) => data
    })
}