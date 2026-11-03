import { useReducer, useState } from 'react';
import BookingForm from './BookingForm';
import { initializeTimes, updateTimes } from './bookingReducer';
import { submitAPI } from './api';
import { toISODate } from './dates';
import './App.css';

export default function App() {
  const [times, dispatch] = useReducer(updateTimes, undefined, initializeTimes);
  const [date, setDate] = useState(toISODate(new Date()));
  const [bookings, setBookings] = useState({}); // { 'YYYY-MM-DD': ['18:00'] }
  const [confirmed, setConfirmed] = useState(null);
  const [failed, setFailed] = useState(false);

  const handleDateChange = (d) => {
    if (!d) return;
    setDate(d);
    dispatch({ date: d });
  };

  // Hide slots already booked this session so they can't be double-booked.
  const available = times.filter((t) => !(bookings[date] || []).includes(t));

  const handleSubmit = (values) => {
    if (!submitAPI(values)) return setFailed(true);
    setFailed(false);
    setBookings((b) => ({ ...b, [values.date]: [...(b[values.date] || []), values.time] }));
    setConfirmed(values);
  };

  return (
    <>
      <header>
        <h1>Little Lemon</h1>
        <nav aria-label="Main">
          <a href="#reservations">Reservations</a>
        </nav>
      </header>
      <main>
        <section id="reservations" aria-labelledby="book-heading">
          <h2 id="book-heading">Reserve a table</h2>
          {confirmed ? (
            <div role="status">
              <p>
                Table booked for {confirmed.guests} on {confirmed.date} at {confirmed.time}.
              </p>
              <button onClick={() => setConfirmed(null)}>Book another table</button>
            </div>
          ) : (
            <>
              {failed && (
                <p className="error" role="alert">
                  We couldn't save your booking. Try again.
                </p>
              )}
              <BookingForm
                availableTimes={available}
                onDateChange={handleDateChange}
                onSubmit={handleSubmit}
              />
            </>
          )}
        </section>
      </main>
      <footer>
        <p>Little Lemon, Chicago</p>
      </footer>
    </>
  );
}
