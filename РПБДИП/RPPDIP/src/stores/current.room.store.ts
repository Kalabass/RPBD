import { IRoom } from "../interfaces/app.interfaces";
import {create} from 'zustand';
import { devtools} from 'zustand/middleware';

interface ICurrentRoomState {
    currentRoom: IRoom | undefined
    roomChange: (room:IRoom) => void
}

export const useCurrentRoomStore = create<ICurrentRoomState>()(
    devtools(
        (set) => ({
            currentRoom: {},
            roomChange: (currentRoom) => set({currentRoom}),
        }),
        {name: 'CurrentUserStore'}
    )
)