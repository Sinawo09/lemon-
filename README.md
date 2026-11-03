# Little Lemon table booking

React booking form for the Little Lemon restaurant (Meta Front-End Developer capstone).

## Setup
Requires Node 18+.
```bash
git clone <your-repo-url> && cd little-lemon
npm install
npm start      # http://localhost:3000
npm test       # unit tests (Jest + React Testing Library)
```

## Structure
- `src/BookingForm.js` controlled form, accessible labels, inline errors
- `src/validation.js` pure validation rules (date not in past, 1-10 guests, time must be available)
- `src/bookingReducer.js` `initializeTimes` / `updateTimes` for available slots
- `src/api.js` local mock of the booking API (swap for a real backend)
- `src/*.test.js` tests for validation, reducer and form behaviour

## Behaviour and edge cases
- Errors appear on blur and on submit, linked to fields with `aria-describedby` and `aria-invalid`.
- Changing the date clears the selected time; a booked slot is removed from that day's list.
- Past dates, 0/negative/non-integer/over-max guests, and empty times are rejected.

## Known limitations
Bookings live in memory only and reset on refresh. No name/contact fields yet.

## Demo
Open `demo.html` in a browser for a standalone, no-install preview of the booking behaviour (design is exploratory, not the final UI).
# lemon-
