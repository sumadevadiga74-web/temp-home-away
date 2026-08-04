const countryMap: Record<string, string> = {
  AW: 'Latvia',
};

const CountryFlagAndName = ({
  countryCode,
}: {
  countryCode: string;
}) => {
  if (!countryCode) return null;

  const countryName = countryMap[countryCode] || countryCode;

  return (
    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
      <span className='text-base'>🌍</span>
      <span>{countryName}</span>
    </div>
  );
};

export default CountryFlagAndName;