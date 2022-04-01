import axios from "axios";
import { User } from '@firebase/auth-types';

const http = axios.create({
    baseURL: "http://localhost:8080/api/squads",
    headers: {
        "Content-type": "application/json"
    }
});

type SquadType = {
    selectedLastTime: boolean,
    id: string,
    name: string,
    active: boolean,
    urlImage: string,
    isPrivate: boolean
}

class SquadService {

    async create(squad: SquadType) {
        return await http.post<SquadType>("/permission", {
            name: squad.name,
            active: squad.active,
            isPrivate: squad.isPrivate,
        });
    }

    async updateSelectedSquad(squadId: string) {
        return await http.put<SquadType>(`/selected/${squadId}`, {});
    }

    async updateActiveStatus(squadId: string, isActive: boolean) {
        return await http.put<SquadType>(`/updateActiveStatus/${squadId}`, {
            active: isActive
        });
    }
}
export default new SquadService();