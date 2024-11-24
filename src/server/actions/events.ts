"use client"

import { useUser } from "@clerk/nextjs";

export const {user} = useUser();
console.log(user)

