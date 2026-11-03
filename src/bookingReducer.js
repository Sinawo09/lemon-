import { fetchAPI } from './api';
import { parseISODate } from './dates';

export const initializeTimes = () => fetchAPI(new Date());

// action: { date: 'YYYY-MM-DD' }
export const updateTimes = (state, action) =>
  action && action.date ? fetchAPI(parseISODate(action.date)) : state;
