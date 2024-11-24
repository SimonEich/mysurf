import { usersTable } from "@/db/schema";
import { db } from "..";
import { weatherData } from "./meteo";
import Link from "next/link";
import { dbWrite } from "..";

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
      <button type="submit" onClick={void dbWrite('a@a.e')}>save</button>
    
    </div>
    
  );
}

