import { usersTable } from "@/db/schema";
import { db } from "..";
import { Nav } from "./nav";
import { weatherData } from "./meteo";
import Link from "next/link";

export default async function Home() {
  const users = await db.select().from(usersTable)
  const weather= weatherData
  console.log(weatherData)
  return (
    <div>
      <Link href="/dashboard" style={{ marginRight: '10px' }}>About</Link>
      <p>{weather.current.waveHeight}</p>
      {users.map((user)=>
      <p key={user.id}>{user.name}</p>)}
    </div>
  );
}

