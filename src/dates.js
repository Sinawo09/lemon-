// Local-time date helpers. Using local time avoids the "off by one day" bug
// that `new Date('YYYY-MM-DD')` (parsed as UTC) causes in some time zones.
export const toISODate = (d) => {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
export const parseISODate = (s) => new Date(`${s}T00:00:00`);
