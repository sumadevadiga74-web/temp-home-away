import Image from 'next/image';

type UserInfoProps = {
  profile: {
    firstName: string;
    profileImage: string;
  };
};

function UserInfo({
  profile: { firstName, profileImage },
}: UserInfoProps) {
  return (
    <div className='flex items-center gap-x-4 mt-6'>
      <Image
        src={profileImage}
        alt={firstName}
        width={48}
        height={48}
        className='rounded-full object-cover'
      />

      <div>
        <p className='text-sm text-muted-foreground'>
          Hosted by
        </p>
        <p className='font-medium'>{firstName}</p>
      </div>
    </div>
  );
}

export default UserInfo;