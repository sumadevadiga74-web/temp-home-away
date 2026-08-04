'use client';

import { useUser } from '@clerk/nextjs';

function UserIcon() {
  const { user } = useUser();

  return (
    <img
      src={user?.imageUrl}
      alt='profile'
      className='w-8 h-8 rounded-full object-cover'
    />
  );
}

export default UserIcon;