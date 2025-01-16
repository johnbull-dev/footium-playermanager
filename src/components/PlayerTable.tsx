"use client"
import {getPlayersByClubId} from "@/utils/api";
import {useMemo, useState} from "react";
import {Player} from "@/utils/players";
import PlayerCard from "@/components/PlayerCard";


export function PlayerTable() {
    const [clubId, setClubId] = useState<number>(0);
    const [players, setPlayers] = useState<Player[]>([]);
    const [showRetired, setShowRetired] = useState(false);
    const [showAcademy, setShowAcademy] = useState(false);
    const [sortField, setSortField] = useState<"firstName" | "creationRating">("firstName");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const handleFetchPlayers = async () => {
        if (!clubId || Number.isNaN(clubId)) return;
        try {
            const data = await getPlayersByClubId(clubId);
            setPlayers(data);
        } catch (err) {
            console.error('Error fetching players:', err);
        }
    };

    const filteredAndSortedPlayers = useMemo(() => {
        let filtered = [...players];

        if (!showRetired) {
            filtered = filtered.filter((player) => !player.isRetired);
        }
        if (!showAcademy) {
            filtered = filtered.filter((player) => !player.isAcademy);
        }

        filtered.sort((a, b) => {
            const fieldA = a[sortField];
            const fieldB = b[sortField];
            if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
            if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [players, showRetired, showAcademy, sortField, sortOrder]);


    return <div className="mx-auto w-[1000px] px-5">

        <div className="">
            <input
                type="number"
                placeholder="Enter Club ID"
                value={clubId}
                onChange={(e) => setClubId(parseInt(e.target.value))}
                className="border border-clipRule-gray-200 bg-clipRule-gray-100 text-black dark:text-white dark:border-clipRule-gray-600 dark:bg-gray-700"
            />
            <button onClick={handleFetchPlayers}>Fetch Players</button>
        </div>

        <div className="">
            <label>
                <input
                    type="checkbox"
                    checked={showRetired}
                    onChange={(e) => setShowRetired(e.target.checked)}
                />
                Show Retired
            </label>
        </div>

        <div className="">
            <label>
                <input
                    type="checkbox"
                    checked={showAcademy}
                    onChange={(e) => setShowAcademy(e.target.checked)}
                />
                Show Academy
            </label>
        </div>

        <div className="sorting">
            <label htmlFor="sortField">Sort By:</label>
            <select
                id="sortField"
                value={sortField}
                onChange={(e) => setSortField(e.target.value as 'firstName' | 'creationRating')}
                className="text-black dark:text-white bg-white dark:bg-gray-700"
            >
                <option value="firstName">Name</option>
                <option value="creationRating">Overall Rating</option>
            </select>

            <label htmlFor="sortOrder">Order:</label>
            <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="text-black dark:text-white bg-white dark:bg-gray-700"
            >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
<div>
    {filteredAndSortedPlayers.length === 0 && <div>No players found</div>}
    {filteredAndSortedPlayers.length > 0 && <div>Found {filteredAndSortedPlayers.length} players</div>}
</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">

            {filteredAndSortedPlayers.map((player) => (
                <PlayerCard key={player.id} player={player}/>
            ))}
        </div>
    </div>
}