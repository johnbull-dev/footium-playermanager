export type Player = {
    id: string;
    clubId: number;
    ownerId: number;
    originClubId: number;
    generationId: number;
    isAcademy: boolean;
    isReserve: boolean;
    isInitial: boolean;
    isTraining: boolean;
    isRetired: boolean;
    isReward: boolean;
    firstName: string;
    lastName: string;
    seed: string;
    nationality: string;
    imageUrls: {
        player: string;
        card: string;
        thumb: string;
    };
    creationRating: number;
    timesteppedPlayerAttributes: {
        id: string;
        age: string;
        leadership: string;
        condition: string;
        stamina: string;
        gamesSuspended: string;
        accumulatedYellows: string;
        isLatest: string;
        timestamp: string;
        footedness: string;
        weakFootAbility: string;
        unlockedPotential: string;
        usedPotential: string;
        accumulatedMinutes: string;
        playerId: string;
        seasonId: string;
    },
    potential: number,
}

export type Club = {
    players: Player[]
}