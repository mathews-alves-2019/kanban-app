import axios from "axios";
import { User } from '@firebase/auth-types';

const http = axios.create({
    baseURL: "http://localhost:8080/api/user",
    headers: {
        "Content-type": "application/json"
    }
});

type UserType = {
    data: {
        id: string,
        name: string,
        email: string,
        password: string,
        position: string,
        avatarImage: string,
        active: boolean,
        isProvided: boolean,
        providedId: string,
        created_at: string,
        expires_at: string,
        profile: {
            id: string,
            name: string,
            canCreateSquad: boolean,
            canCreateBoard: boolean,
            canCreateCard: boolean,
            canEditCard: boolean,
            canEditBoard: boolean,
            canEditSquad: boolean,
            canDeleteSquad: boolean,
            canDeleteBoard: boolean,
            canDeleteCard: boolean,
            active: boolean
        },
        notifications: {
            receiveActivityAlerts: boolean,
            receiveBoardsUpdate: boolean,
            receiveCardsUpdate: boolean,
            receiveInvites: boolean,
            receiveSprintAlerts: boolean,
            id: string
        },
        userSquads: {
            selectedLastTime: boolean,
            id: string,
            name: string,
            active: boolean,
            urlImage: string,
            isPrivate: boolean
        }
    }
}

class UserService {

    async create(user: User) {
        return await http.post<UserType>("/permission", {
            name: user.displayName,
            email: user.email,
            avatarImage: user.photoURL,
            isProvided: true,
            providedId: user.uid,
        });
    }

    async updateReceiveOption(value: boolean, user: any, field: string) {
        return await http.put<UserType>(`/notification/invites/${user.id}`, {
            receiveInvites: value,
            field: field
        });
    }
}
export default new UserService();