import {GraphQLClient, gql} from 'graphql-request';
import {Club} from "@/utils/players";

const ENDPOINT = 'https://live.api.footium.club/api/graphql';
const client = new GraphQLClient(ENDPOINT);

export const getPlayersByClubId = async (clubId: number) => {
    const query = gql`
  query Players ($clubId: Int!) {
     players(where: { clubId: { equals: $clubId } }) {
        id
        clubId
        ownerId
        originClubId
        generationId
        isAcademy
        isReserve
        isInitial
        isTraining
        isRetired
        isReward
        firstName
        lastName
        seed
        nationality
        imageUrls {
            player
            card
            thumb
        }
        timesteppedPlayerAttributes {
            id
            age
            leadership
            condition
            stamina
            gamesSuspended
            accumulatedYellows
            isLatest
            timestamp
            footedness
            weakFootAbility
            unlockedPotential
            usedPotential
            accumulatedMinutes
            playerId
            seasonId
        }
        potential
        creationRating
    }
}
  `
    const variables = {clubId};
    const data = await client.request<Club>(query, variables);
    return data.players;
};
