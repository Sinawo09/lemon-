import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

const setup = () => {
  const onSubmit = jest.fn();
  render(<BookingForm availableTimes={['17:00', '18:00']} onDateChange={jest.fn()} onSubmit={onSubmit} />);
  return onSubmit;
};

test('every input has an accessible label', () => {
  setup();
  ['Date', 'Time', 'Number of guests', /Occasion/].forEach((l) =>
    expect(screen.getByLabelText(l)).toBeInTheDocument()
  );
});

test('blocks submit and explains why when no time is chosen', () => {
  const onSubmit = setup();
  fireEvent.click(screen.getByRole('button', { name: /reserve table/i }));
  expect(screen.getByRole('alert')).toHaveTextContent('Choose a time.');
  expect(screen.getByLabelText('Time')).toHaveAttribute('aria-invalid', 'true');
  expect(onSubmit).not.toHaveBeenCalled();
});

test('shows a guest-count error for 0 guests', () => {
  setup();
  fireEvent.change(screen.getByLabelText('Number of guests'), { target: { value: '0' } });
  fireEvent.blur(screen.getByLabelText('Number of guests'));
  expect(screen.getByRole('alert')).toHaveTextContent(/between 1 and 10/);
});

test('submits valid data', () => {
  const onSubmit = setup();
  fireEvent.change(screen.getByLabelText('Time'), { target: { value: '18:00' } });
  fireEvent.click(screen.getByRole('button', { name: /reserve table/i }));
  expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ time: '18:00', guests: '2' }));
});
