'use client';

import { Calendar } from '@/components/ui/calendar';
import { useProperty } from '@/utils/store';
import { generateBlockedPeriods } from '@/utils/calendar';

export default function BookingCalendar() {
  const { bookings, range } = useProperty();
  const setRange = useProperty.setState;

  const today = new Date();

  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today,
  });

  return (
    <Calendar
      mode='range'
      selected={range}
      onSelect={(selectedRange) => {
        setRange({ range: selectedRange });
      }}
      defaultMonth={today}
      disabled={[
        { before: today },
        ...blockedPeriods,
      ]}
      numberOfMonths={2}
    />
  );
}
