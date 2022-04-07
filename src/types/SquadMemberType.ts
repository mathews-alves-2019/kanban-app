export interface SquadMemberType {
    usersId: string,
    squadsId: string,
    active: boolean,
    position: string,
    canCreateBoard: boolean,
    canCreateCard: boolean,
    canEditBoard: boolean,
    canEditSquad: boolean,
    canDeleteBoard: boolean,
    canDeleteCard: boolean,
    canEditCard: boolean
}