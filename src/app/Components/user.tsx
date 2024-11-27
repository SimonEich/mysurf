"use client";

import { useUser } from "@clerk/nextjs";

export function FuncUser(){
    const {user} = useUser();
    console.log(user?.fullName)
    if (!user) return (<div>
        <h1>User not logged in</h1>
    </div>);
    if (user) return (
    <div>
    {<h1>hello{user.firstName}</h1>}
    
    </div>
    )
    };
