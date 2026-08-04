import { formatQuantity } from '@/utils/format';

type PropertyDetailsProps = {
  bedrooms: number | null;
  baths: number | null;
  guests: number | null;
  beds: number | null;
};




function PropertyDetails({
  bedrooms,
  baths,
  guests,
  beds,
}: PropertyDetailsProps) {
  return (
    <div className='mt-4'>
      <p className='text-muted-foreground'>
        {formatQuantity(bedrooms ?? 0, 'bedroom')} ·{' '}
        {formatQuantity(baths ?? 0, 'bath')} ·{' '}
        {formatQuantity(guests ?? 0, 'guest')} ·{' '}
        {formatQuantity(beds ?? 0, 'bed')}
      </p>
    </div>
  );
}

export default PropertyDetails;