import {Player} from "@/utils/players";
import React from "react";

function PlayerCard(props: { player: Player }) {
    return <>
        <div className="mx-auto w-[380px] px-5">
            <div
                className="rounded-3xl border border-custom-gray-200 bg-custom-gray-100 dark:border-custom-gray-600 dark:bg-custom-gray-700">
                <div
                    className="rounded-3xl bg-white p-4 ring-1 ring-custom-gray-200 dark:bg-custom-gray-800 dark:ring-custom-gray-600">
                    <div className="relative overflow-hidden pb-3">
                        <div className="overflow-hidden [filter:url('#rounded')]">
                            <div
                                className="relative h-[300px] border border-custom-gray-200 bg-gradient-to-b from-purple-300 to-purple-700 [clip-path:polygon(0_0,_100%_0,_100%_90%,_50%_100%,_0_90%)] dark:border-custom-gray-600">
                                <div
                                    className="pointer-events-none absolute start-1/2 top-10 -z-10 ms-8 -translate-x-1/2 text-center text-9xl/[0.8em] font-extrabold uppercase italic tracking-tighter text-white opacity-40 mix-blend-overlay">
                                </div>
                                <img
                                    src={props.player.imageUrls.player}
                                    alt="Player"
                                    className="absolute start-1/2 top-2 -translate-x-1/2"
                                />
                            </div>
                        </div>

                   </div>

                    <div className="pb-1 pt-3 text-center text-slate-800">
                        <h2 className="text-[22px]/tight font-bold tracking-tight">{props.player.firstName} {props.player.lastName}</h2>
                    </div>
                </div>

                <div
                    className="mx-auto grid w-fit grid-cols-3 divide-x divide-custom-gray-200 py-5 text-slate-800 dark:divide-custom-gray-600 dark:text-white">
                    <div className="px-7 text-center">
                        <div className="mb-2 text-sm/tight font-bold">{props.player.timesteppedPlayerAttributes.age}</div>
                        <div className="text-[0.6875rem]/tight uppercase">Age</div>
                    </div>
                    <div className="px-7 text-center">
                        <div className="mb-2 text-sm/tight font-bold">{props.player.timesteppedPlayerAttributes.leadership}</div>
                        <div className="text-[0.6875rem]/tight uppercase">Leadership</div>
                    </div>
                    <div className="px-7 text-center">
                        <div className="mb-2 text-sm/tight font-bold">{props.player.creationRating}</div>
                        <div className="text-[0.6875rem]/tight uppercase">Rating</div>
                    </div>
                </div>
            </div>

            <svg className="invisible absolute" width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="rounded">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur"/>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                                       result="goo"/>
                        <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                    </filter>
                </defs>
            </svg>
        </div>
    </>
        ;
}

export default PlayerCard;