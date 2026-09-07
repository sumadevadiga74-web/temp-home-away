'use client';

import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useToast } from '@/components/ui/use-toast';
import { useProperty } from '@/utils/store';

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from '@/utils/calendar';

function BookingCalendar() {
  const currentDate = new Date();
  const { toast } = useToast();

  const bookings = useProperty((state) => state.bookings);

  const [range, setRange] =
    useState<DateRange | undefined>(defaultSelected);

  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate,
  });

  const unavailableDates = generateDisabledDates(blockedPeriods);

  useEffect(() => {
    if (!range?.from || !range?.to) {
      useProperty.setState({ range });
      return;
    }

    const selectedDates = generateDateRange(range);

    const hasBookedDate = selectedDates.some(
      (date) => unavailableDates[date]
    );

    if (hasBookedDate) {
      setRange(defaultSelected);

      toast({
        description:
          'This date is already booked. Please select another date.',
      });

      useProperty.setState({
        range: defaultSelected,
      });

      return;
    }

    useProperty.setState({ range });
  }, [range, toast, unavailableDates]);

  const handleDayClick = (day: Date) => {
    const dateKey = day.toISOString().split('T')[0];

    if (unavailableDates[dateKey]) {
      toast({
        description:
          'This date is already booked. Please select another date.',
      });

      return;
    }
  };

  const handleSelect = (newRange: DateRange | undefined) => {
    if (!newRange) {
      setRange(undefined);
      return;
    }

    if (newRange.from) {
      const fromKey = newRange.from
        .toISOString()
        .split('T')[0];

      if (unavailableDates[fromKey]) {
        toast({
          description:
            'This date is already booked. Please select another date.',
        });

        return;
      }
    }

    if (newRange.to) {
      const selectedDates = generateDateRange(newRange);

      const hasBookedDate = selectedDates.some(
        (date) => unavailableDates[date]
      );

      if (hasBookedDate) {
        toast({
          description:
            'This date is already booked. Please select another date.',
        });

        return;
      }
    }

    setRange(newRange);
  };

  return (
    <Calendar
      mode='range'
      defaultMonth={currentDate}
      selected={range}
      onSelect={handleSelect}
      onDayClick={handleDayClick}
      className='mb-4'
      disabled={{
        before: currentDate,
      }}
      modifiers={{
        booked: (date) => {
          const dateKey = date.toISOString().split('T')[0];
          return !!unavailableDates[dateKey];
        },
      }}
      modifiersClassNames={{
        booked: 'opacity-50 line-through',
      }}
    />
  );
}

export default BookingCalendar;