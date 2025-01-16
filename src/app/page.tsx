import Navigation from "@/components/Navigation";
import {PlayerTable} from "@/components/PlayerTable";


export default async function Home() {
  return (
      <div className="container mx-auto">
          <Navigation />
        <PlayerTable/>
      </div>
  );
}
