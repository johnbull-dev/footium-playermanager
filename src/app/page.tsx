import {PlayerTable} from "@/components/PlayerTable";


export default async function Home() {
  return (
      <div className="container mx-auto">
        <h1 className="text-3xl">Footium Players</h1>
        <PlayerTable/>
      </div>
  );
}
