import { useQuery } from "@tanstack/react-query"
import logsService from "../services/logs.service"

export const useLogs = () => {
    return useQuery({
        queryKey: ['logs'],
        queryFn: () => logsService.getAll(),
        select: ({data}) => data
    })
}