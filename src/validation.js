import { toISODate } from './dates';

export { toISODate };
export const MAX_GUESTS = 10;
export const OCCASIONS = ['Birthday', 'Anniversary'];

// Returns an object of { field: message }. Empty object means valid.
export function validateBooking(values, availableTimes = [], today = new Date()) {
  const { date, time, guests } = values;
  const errors = {};

  if (!date) errors.date = 'Choose a date.';
  else if (date < toISODate(today)) errors.date = 'Choose today or a later date.';

  if (!time) errors.time = 'Choose a time.';
  else if (!availableTimes.includes(time))
    errors.time = 'That time is no longer available. Choose another.';

  const n = Number(guests);
  if (guests === '' || !Number.isInteger(n)) errors.guests = 'Enter a whole number of guests.';
  else if (n < 1 || n > MAX_GUESTS)
    errors.guests = `Choose between 1 and ${MAX_GUESTS} guests.`;

  return errors;
}
