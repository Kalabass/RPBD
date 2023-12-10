import { IUser } from "../interfaces/app.interfaces";
import {create} from 'zustand';
import { devtools, persist} from 'zustand/middleware';

interface CurrentUserState {
    authorizedUser: IUser | undefined
    userChange: (authorizedUser:IUser) => void
}

export const useAuthorizedUserStore = create<CurrentUserState>()(
    devtools(
        persist(
            (set) => ({
                authorizedUser: {},
                userChange: (authorizedUser) => set({authorizedUser}),
            }),
            {name: 'AuthorizedUserStore'}
        )
    )
)