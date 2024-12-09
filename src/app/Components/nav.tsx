"use client";

import React from 'react';
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';


export const Nav = () => {
    const {user, isSignedIn} = useUser();

    return (<div className="bg-gray-600 p-4">
            {isSignedIn && 
            <div className='flex align-middle'>
            <Link href="/" style={{ marginRight: '10px' }} className='flex w-1/5 bg-cyan-600 py-2 justify-center rounded-lg'>Home</Link>
            <Link href="MySpots"style={{ marginRight: '10px' }} className='flex w-1/5 bg-cyan-600 py-2 justify-center rounded-lg'>My Spots</Link>
            <Link href="SearchSpots"style={{ marginRight: '10px' }} className='flex w-1/5 bg-cyan-600 py-2 justify-center rounded-lg'>Search Spots</Link>
            <div className='absolute right-8 flex'>
            <h1 className='m-2'>{user?.firstName}</h1>

            <SignedIn>
                <UserButton />
            </SignedIn>
            </div>
            </div>}
            <SignedOut>
                <SignInButton />
            </SignedOut>
            </div>

);
};
