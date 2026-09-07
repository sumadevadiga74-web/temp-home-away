import db from './db';

async function main() {
  // get your existing profile
  const profile = await db.profile.findFirst();

  if (!profile) {
    console.log('No profile found. Please sign in once first.');
    return;
  }

  await db.property.createMany({
    data: [
      {
        name: 'Beach House in Goa',
        tagline: 'Relax by the sea',
        price: 150,
        category: 'cottage',
        description: 'Beautiful beach house near the shore.',
        country: 'India',
        image:
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
        guests: 4,
        bedrooms: 2,
        beds: 2,
        baths: 2,
     amenities: '',
        profileId: profile.clerkId,
      },
      {
        name: 'Mountain Cabin in Himachal',
        tagline: 'Peaceful mountain retreat',
        price: 120,
        category: 'cabin',
        description: 'Cozy cabin with mountain views.',
        country: 'India',
        image:
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop',
        guests: 3,
        bedrooms: 1,
        beds: 2,
        baths: 1,
     amenities: '',
        profileId: profile.clerkId,
      },
    ],
  });

  console.log('Sample properties added!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await db.$disconnect();
  });