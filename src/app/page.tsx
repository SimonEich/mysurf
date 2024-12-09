import { usersTable } from "@/db/schema";
import { db } from "..";
import { weatherData } from "./meteo";
import Link from "next/link";
import { FuncUser } from "./Components/user";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Geocoding } from "./Components/geocoding";
import App1 from "./Components/geocoding2";




export default async function Home() {

  const users = await db.select().from(usersTable)
  const weather= weatherData
  console.log(weatherData)
  return (
    <div>
    <SignedOut>
      <div className="grid grid-cols-1"> 
      <div className="flex place-content-center m-80">
        <SignInButton />
        <h1 className="ml-2">to find your the perfect Spot!</h1>
      </div>
      </div>
    </SignedOut>

    <SignedIn>
    <Link href="/dashboard" style={{ marginRight: "10px" }}>
      About
    </Link>
    <h1>{weather?.current?.waveHeight}</h1>
    {users.map((user) => (
    <h1 key={user.id}>{user.name}</h1>
    ))}
    <FuncUser/>
    <Geocoding/>
    <App1/>

    </SignedIn>
  </div>    
  );
}

