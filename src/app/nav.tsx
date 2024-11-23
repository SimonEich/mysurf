import React from 'react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export const Nav = () => {
    return (<div className="">
            <Link href="/dashboard"style={{ marginRight: '10px' }}>dash</Link>
            <Link href="/" style={{ marginRight: '10px' }}>home</Link>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
            </div>
);
};
