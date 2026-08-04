'use client';

import { useState } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import UserIcon from './UserIcon';
import { links } from '@/utils/links';

export default function LinksDropdown() {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);

  if (!isSignedIn) {
    return (
      <div className='flex items-center gap-2'>
        <Link href='/sign-in'>Login</Link>
        <Link href='/sign-up'>Register</Link>
      </div>
    );
  }

  return (
    <div className='relative'>
      <button
        onClick={() => setOpen(!open)}
        className='flex items-center gap-2 border rounded-full px-3 py-2'
      >
        <Menu className='w-5 h-5' />
        <UserIcon />
      </button>

      {open && (
        <div className='absolute right-0 mt-2 w-52 rounded-md border bg-white shadow-lg z-50'>
          <div className='flex flex-col p-2'>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='px-3 py-2 text-sm hover:bg-gray-100 rounded capitalize'
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={() => signOut()}
              className='px-3 py-2 text-left text-sm hover:bg-gray-100 rounded'
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}