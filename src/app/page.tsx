import { usersTable } from "@/db/schema";
import { db } from "..";
import { weatherData } from "./meteo";
import Link from "next/link";
import { FuncUser } from "./Components/user";




export default async function Home() {

  const users = await db.select().from(usersTable)
  const weather= weatherData
  console.log(weatherData)
  return (
    <div>
    <Link href="/dashboard" style={{ marginRight: "10px" }}>
      About
    </Link>
    <h1>{weather?.current?.waveHeight}</h1>
    {users.map((user) => (
    <h1 key={user.id}>{user.name}</h1>
    ))}
    <FuncUser/>
  </div>    
  );
}

