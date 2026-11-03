// Local stand-in for the course's remote booking API, so the app has no
// network dependency. Availability is deterministic per day of the month.
const seededRandom = (seed) => {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = seed % m;
  return () => (s = (s * a) % m) / m;
};

export const fetchAPI = (date) => {
  const random = seededRandom(date.getDate());
  const times = [];
  for (let hour = 17; hour <= 23; hour++) {
    if (random() < 0.5) times.push(`${hour}:00`);
    if (random() < 0.5) times.push(`${hour}:30`);
  }
  return times;
};

// Replace with a real POST when a backend exists. Returns true on success.
export const submitAPI = () => true;
