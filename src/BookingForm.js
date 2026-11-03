import { useState } from 'react';
import { validateBooking, toISODate, MAX_GUESTS, OCCASIONS } from './validation';

export default function BookingForm({ availableTimes, onDateChange, onSubmit }) {
  const [values, setValues] = useState({
    date: toISODate(new Date()),
    time: '',
    guests: '2',
    occasion: '',
  });
  const [touched, setTouched] = useState({});
  const errors = validateBooking(values, availableTimes);
  const showError = (name) => touched[name] && errors[name];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Changing the date invalidates the chosen time.
    setValues((v) => ({ ...v, [name]: value, ...(name === 'date' ? { time: '' } : {}) }));
    if (name === 'date') onDateChange(value);
  };

  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ date: true, time: true, guests: true });
    if (Object.keys(errors).length === 0) onSubmit(values);
  };

  // Shared accessibility wiring: invalid state + link to the error message.
  const props = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': showError(name) ? 'true' : 'false',
    'aria-describedby': showError(name) ? `${name}-error` : undefined,
  });
  const error = (name) =>
    showError(name) && (
      <p id={`${name}-error`} className="error" role="alert">
        {errors[name]}
      </p>
    );

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Reserve a table">
      <label htmlFor="date">Date</label>
      <input type="date" required min={toISODate(new Date())} {...props('date')} />
      {error('date')}

      <label htmlFor="time">Time</label>
      <select required {...props('time')}>
        <option value="">Select a time</option>
        {availableTimes.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
      {availableTimes.length === 0 && (
        <p className="hint">No tables are free on this date. Try another day.</p>
      )}
      {error('time')}

      <label htmlFor="guests">Number of guests</label>
      <input type="number" min="1" max={MAX_GUESTS} required {...props('guests')} />
      {error('guests')}

      <label htmlFor="occasion">Occasion (optional)</label>
      <select {...props('occasion')}>
        <option value="">None</option>
        {OCCASIONS.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>

      <button type="submit">Reserve table</button>
    </form>
  );
}
