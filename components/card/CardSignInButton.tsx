'use client';

import { SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { FaRegHeart } from 'react-icons/fa';

export const CardSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="p-2 cursor-pointer"
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};