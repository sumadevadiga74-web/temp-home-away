import Link from 'next/link';

function BreadCrumbs({ name }: { name: string }) {
  return (
    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
      <Link href='/' className='hover:text-primary'>
        Home
      </Link>
      <span>/</span>
      <span className='text-foreground'>{name}</span>
    </div>
  );
}

export default BreadCrumbs;