import axios from "axios";
import { User } from '@firebase/auth-types';

const http = axios.create({
    baseURL: "http://localhost:8080/api/profile",
    headers: {
        "Content-type": "application/json"
    }
});

type ProfileType = {
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
}

class ProfileService {

    async getProfiles() {
        return await http.get<ProfileType>(`/`, {}).then(result => {
            return result.data;
        });
    }

    
}
export default new ProfileService();