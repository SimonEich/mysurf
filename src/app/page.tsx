import { usersTable } from "@/db/schema";
import { db } from "..";
import { Nav } from "./nav";
import { weatherData } from "./meteo";

export default async function Home() {
  const users = await db.select().from(usersTable)
  const weather= weatherData
  console.log(weatherData)
  return (
    <div>
      <p>{weather.current.waveHeight}</p>
      {users.map((user)=>
      <p key={user.id}>{user.name}</p>)}
      <Nav/>
    </div>
  );
}
