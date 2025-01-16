import {Player} from "@/utils/players";
import React from "react";

function PlayerCard(props: { player: Player }) {
    return <div className="flex flex-col items-center">
        <div className="border-2 border-gray-200 rounded-lg p-4">
            <img src={props.player.imageUrls.player} alt="Player image"/>
            {props.player.firstName} {props.player.lastName}
            <div className="flex">
                <div>Age:
                    {props.player.timesteppedPlayerAttributes.age}
                </div>
                <div>Leadership: {props.player.timesteppedPlayerAttributes.leadership}</div>
                <div>Rating:
                    <div>{props.player.creationRating}</div>
                </div>
            </div>
        </div>
    </div>;
}

export default PlayerCard;