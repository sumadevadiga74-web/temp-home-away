'use client';

import { SignOutButton } from '@clerk/nextjs';

function SignOutLink() {
  return (
    <SignOutButton redirectUrl="/">
      <button className="w-full text-left">
        Logout
      </button>
    </SignOutButton>
  );
}

export default SignOutLink;