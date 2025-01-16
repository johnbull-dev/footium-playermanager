"use client"
import {getPlayersByClubId} from "@/utils/api";
import {useMemo, useState} from "react";
import {Player} from "@/utils/players";
import PlayerCard from "@/components/PlayerCard";


export function PlayerTable() {
    const [clubId, setClubId] = useState<number>();
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


    return <div className="mx-auto px-5 pt-5">

        <div className="py-5 text-black dark:text-white">
            <p>Search for club players by entering the club Id in the search box below.</p>
        </div>
        <div>
            <label htmlFor="default-search"
                   className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="number" id="default-search"
                       value={clubId}
                       onChange={(e) => setClubId(parseInt(e.target.value))}
                       className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Search by club ID" required/>
                <button
                    onClick={handleFetchPlayers}
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
                </button>
            </div>

        </div>
        {players.length > 0 && <div>
            <div className="pt-5">
            <label className="inline-flex items-center mb-5 cursor-pointer">
                <input type="checkbox"
                       checked={showRetired}
                       onChange={(e) => setShowRetired(e.target.checked)} className="sr-only peer"/>
                <div
                    className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show Retired</span>
            </label>
        </div>

        <div>
            <label className="inline-flex items-center mb-5 cursor-pointer">
                <input type="checkbox"
                       checked={showAcademy}
                       onChange={(e) => setShowAcademy(e.target.checked)}
                       className="sr-only peer"/>
                <div
                    className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show Academy</span>
            </label>
        </div>

        <div>
            <label htmlFor="sortField" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sort
                By:</label>
            <select
                id="sortField"
                value={sortField}
                onChange={(e) => setSortField(e.target.value as 'firstName' | 'creationRating')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                <option value="firstName">Name</option>
                <option value="creationRating">Overall Rating</option>
            </select>

            <label htmlFor="sortOrder"
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Order:</label>
            <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
        <div className="pt-5 text-sm text-gray-500 dark:text-gray-400">
            {filteredAndSortedPlayers.length === 0 && <div>No players found</div>}
            {filteredAndSortedPlayers.length > 0 && <div>Found {filteredAndSortedPlayers.length} players</div>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

            {filteredAndSortedPlayers.map((player) => (
                <PlayerCard key={player.id} player={player}/>
            ))}
        </div></div>}
    </div>
}