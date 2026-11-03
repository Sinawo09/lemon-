import { validateBooking } from './validation';

const today = new Date(2026, 9, 22); // 22 Oct 2026
const ok = { date: '2026-10-22', time: '18:00', guests: '2' };
const times = ['18:00'];

test('accepts a valid booking', () => {
  expect(validateBooking(ok, times, today)).toEqual({});
});
test('rejects a past date', () => {
  expect(validateBooking({ ...ok, date: '2026-10-21' }, times, today).date).toMatch(/later date/);
});
test.each(['0', '-1', '11', '1.5', ''])('rejects guests = "%s"', (g) => {
  expect(validateBooking({ ...ok, guests: g }, times, today).guests).toBeDefined();
});
test('rejects a time that is not available', () => {
  expect(validateBooking({ ...ok, time: '19:00' }, times, today).time).toMatch(/no longer/);
});
test('requires a time', () => {
  expect(validateBooking({ ...ok, time: '' }, times, today).time).toBe('Choose a time.');
});
