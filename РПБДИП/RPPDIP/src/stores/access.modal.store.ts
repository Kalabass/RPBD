import {create} from 'zustand';
import { devtools} from 'zustand/middleware';

interface IAccessModalState {
    isShown: boolean
    room: {name: string, id: number} | undefined
    setRoom: (room:{name: string, id: number}) => void
    setIsShown: (isShown:boolean) => void
}

export const useAccessModalStore = create<IAccessModalState>()(
    devtools(
        (set) => ({
            room: undefined,
            isShown: false,
            setIsShown: (isShown) => set({ isShown }),
            setRoom: (room) => set({room}),
        }),
        {name: 'AccessModalStore'}
    )
)