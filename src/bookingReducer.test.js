import { initializeTimes, updateTimes } from './bookingReducer';

test('initializeTimes returns an array of time strings', () => {
  const times = initializeTimes();
  expect(Array.isArray(times)).toBe(true);
  times.forEach((t) => expect(t).toMatch(/^\d{2}:\d{2}$/));
});
test('updateTimes returns times for the chosen date', () => {
  expect(updateTimes([], { date: '2026-10-25' })).toEqual(updateTimes(['x'], { date: '2026-10-25' }));
});
test('updateTimes keeps state when no date is given', () => {
  expect(updateTimes(['17:00'], {})).toEqual(['17:00']);
});
