import axios from "axios";
import { SquadTypeResponse, SquadType, SquadTypeForSubmit } from "../types/SquadType";
import { SquadMemberType } from "../types/SquadMemberType";

const http = axios.create({
    baseURL: "http://localhost:8080/api/squads",
    headers: {
        "Content-type": "application/json"
    }
});

type SquadMembersType = {
    usersId: string,
    squads: any,
    users: {
        id: string,
        name: string,
        email: string,
        password: string,
        position: string,
        avatarImage: string,
        active: boolean,
        isProvided: boolean,
        providedId: string,
        created_at: Date,
        expires_at: Date | null,
        profile: any,
        notifications: any
    }
}

class SquadService {

    async create(squad: SquadTypeForSubmit) {
        return await http.post<SquadTypeResponse>(`/`, {
            name: squad.name,
            active: squad.active,
            isPrivate: squad.isPrivate,
            urlImage: squad.urlImage
        });
    }

    async getSquadMembers(squadId: string) {
        console.log('sdasdkj')
        return await http.get<SquadMembersType>(`/${squadId}/members`, {
        });
    }

    async update(squad: SquadTypeForSubmit, squadId: string) {
        return await http.put<SquadTypeResponse>(`/`, {
            id: squadId,
            name: squad.name,
            active: squad.active,
            isPrivate: squad.isPrivate,
            urlImage: squad.urlImage
        });
    }

    async addMemberOnSquad(squadMember: SquadMemberType) {
        return await http.post<SquadTypeResponse>(`/addMember/`, {
            usersId: squadMember.usersId,
            squadsId: squadMember.squadsId,
            active: squadMember.active,
            position: squadMember.position,
            canCreateBoard: squadMember.canCreateBoard,
            canCreateCard: squadMember.canCreateCard,
            canEditBoard: squadMember.canEditBoard,
            canEditSquad: squadMember.canEditSquad,
            canDeleteBoard: squadMember.canDeleteBoard,
            canDeleteCard: squadMember.canDeleteCard,
            canEditCard: squadMember.canEditCard
        });
    }

    async updateSelectedSquad(squadId: string) {
        return await http.put<SquadTypeResponse>(`/selected/${squadId}`, {});
    }

    async updateActiveStatus(squadId: string, isActive: boolean) {
        return await http.put<SquadTypeResponse>(`/updateActiveStatus/${squadId}`, {
            active: isActive
        });
    }
}
export default new SquadService();