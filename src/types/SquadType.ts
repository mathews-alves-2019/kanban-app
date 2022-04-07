export interface SquadTypeResponse {
    data: {
        selectedLastTime?: boolean;
        id?: string;
        name: string;
        active: boolean;
        urlImage: string;
        isPrivate: boolean;
    }
}

export interface SquadType {
    selectedLastTime?: boolean;
    id?: string;
    name: string;
    active: boolean;
    urlImage: string;
    isPrivate: boolean;
}