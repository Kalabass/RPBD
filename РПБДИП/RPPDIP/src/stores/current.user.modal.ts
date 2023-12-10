import { IUser } from "../interfaces/app.interfaces";
import {create} from 'zustand';
import { devtools, persist} from 'zustand/middleware';

interface CurrentUserState {
    currentUser: IUser | undefined
    userChange: (currentUser:IUser) => void
}

export const useCurrentUserModalStore = create<CurrentUserState>()(
    devtools(
        persist(
            (set) => ({
                currentUser: {},
                userChange: (currentUser) => set({currentUser}),
            }),
            {name: 'CurrentUserStore'}
        )
    )
)