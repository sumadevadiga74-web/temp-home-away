'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import db from '@/utils/db';
import {
  profileSchema,
  propertySchema,
  imageSchema,
} from '@/utils/schemas';

import {
  renderError,
  validateWithZodSchema,
} from '@/utils/helpers';

import { uploadImage } from '@/utils/supabase';

// ----------------------
// Get authenticated user
// ----------------------
const getAuthUser = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error('You must be logged in to access this route');
  }

  return user;
};

// ----------------------
// Create profile
// ----------------------
export async function createProfileAction(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    throw new Error('No user found');
  }

  const rawData = Object.fromEntries(formData);

  const validatedFields = validateWithZodSchema(
    profileSchema,
    rawData
  );

  const existingProfile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (existingProfile) {
    redirect('/profile');
  }

  await db.profile.create({
    data: {
      clerkId: user.id,
      ...validatedFields,
      email: user.emailAddresses[0].emailAddress,
      profileImage: user.imageUrl,
    },
  });

  redirect('/profile');
}

// ----------------------
// Fetch profile image
// ----------------------
export const fetchProfileImage = async () => {
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
};

// ----------------------
// Fetch complete profile
// ----------------------
export const fetchProfile = async () => {
  const user = await getAuthUser();

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!profile) {
    redirect('/profile/create');
  }

  return profile;
};

// ----------------------
// Update profile
// ----------------------
export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);

    const validatedFields = validateWithZodSchema(
      profileSchema,
      rawData
    );

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields,
    });

    revalidatePath('/profile');

    return { message: 'Profile updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

// ----------------------
// Update profile image
// ----------------------
export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const image = formData.get('image') as File;

    const validatedFields = validateWithZodSchema(
      imageSchema,
      { image }
    );

    const fullPath = await uploadImage(validatedFields.image);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPath,
      },
    });

    revalidatePath('/profile');

    return { message: 'Profile image updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

// ----------------------
// Create property
// ----------------------
export const createPropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);

    // uploaded image
    const file = formData.get('image') as File;

    // validate fields
    const validatedFields = validateWithZodSchema(
      propertySchema,
      rawData
    );

    // validate image
    const validatedFile = validateWithZodSchema(
      imageSchema,
      { image: file }
    );

    // upload image to Supabase
    // TEMPORARY: skip image upload
const fullPath = '/images/placeholder.jpg';
    // get profile
    const profile = await db.profile.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (!profile) {
      return { message: 'Profile not found' };
    }

    // create property
    await db.Property.create({
      data: {
        ...validatedFields,
        image: fullPath,
        profileId: profile.clerkId,
      },
    });
  } catch (error) {
    return renderError(error);
  }

  redirect('/');
};
// ----------------------
// Fetch properties
// ----------------------
export const fetchProperties = async ({
  search = '',
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const properties = await db.Property.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { tagline: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    select: {
      id: true,
      name: true,
      tagline: true,
      country: true,
      image: true,
      price: true,
    },
  });

  return properties;
};

// ----------------------
// Fetch favorite ID
// ----------------------
export const fetchFavoriteId = async ({
  propertyId,
}: {
  propertyId: string;
}) => {
  const user = await currentUser();

  // if user is not logged in, no favorite exists
  if (!user) return null;

  const favorite = await db.Favorite.findFirst({
    where: {
      propertyId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });

  return favorite?.id || null;
};

// ----------------------
// Toggle favorite
// ----------------------
export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();

  const { propertyId, favoriteId, pathname } = prevState;

  try {
    if (favoriteId) {
      await db.Favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.Favorite.create({
        data: {
          propertyId,
          profileId: user.id,
        },
      });
    }

    revalidatePath(pathname);

    return {
      message: favoriteId
        ? 'Removed from Faves'
        : 'Added to Faves',
    };
  } catch (error) {
    return renderError(error);
  }
};

// ----------------------
// Fetch all favorites
// ----------------------
export const fetchFavorites = async () => {
  const user = await getAuthUser();

  const favorites = await db.Favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          tagline: true,
          price: true,
          country: true,
          image: true,
        },
      },
    },
  });

  return favorites.map((favorite) => favorite.property);
};

export const fetchPropertyDetails = async (id: string) => {
  return await db.Property.findUnique({
    where: {
      id,
    },
    include: {
      profile: {
        select: {
          firstName: true,
          profileImage: true,
        },
      },
    },
  });
};