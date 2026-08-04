import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { createProfileAction } from '@/utils/actions';

export default async function CreateProfilePage() {
  const user = await currentUser();

  if (user?.privateMetadata?.hasProfile) {
    redirect('/');
  }

  return (
    <div className="p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Create Profile</h1>

      <form action={createProfileAction} className="flex flex-col gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
}