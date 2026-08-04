"use server";

import { currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";

export async function fetchProfileImage() {
  const user = await currentUser();

  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });

  return profile?.profileImage;
}