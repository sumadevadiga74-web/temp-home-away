import Image from 'next/image';

function ImageContainer({
  mainImage,
  name,
}: {
  mainImage: string;
  name: string;
}) {
  return (
    <div className='mt-6 relative w-full h-[280px] md:h-[360px] lg:h-[420px] rounded-xl overflow-hidden'>
      <Image
        src={mainImage}
        alt={name}
        fill
        priority
        className='object-cover'
        sizes='100vw'
      />
    </div>
  );
}

export default ImageContainer;