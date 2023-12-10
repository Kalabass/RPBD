import { useQuery } from "@tanstack/react-query";
import incidentsService from "../services/incidents.service";

export const useIncidents = () => {
    return useQuery({
        queryKey: ['incidents'],
        queryFn: () => incidentsService.getAll(),
        select: ({data}) => data
    })
}