import {getMessageTimeDisplay} from './getMessageTimeDisplay';

describe('getMessageTimeDisplay', () => {
  it('should return the time if the date is today', () => {
    const today = new Date();
    const time = today.getTime();
    expect(getMessageTimeDisplay(time)).toBe(
      today.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
    );
  });

  it('should return "Yesterday" if the date is yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const time = yesterday.getTime();
    expect(getMessageTimeDisplay(time)).toBe('Yesterday');
  });

  it('should return the month and day if the date is this year', () => {
    const thisYear = new Date();
    thisYear.setDate(thisYear.getDate() - 2);
    const time = thisYear.getTime();
    expect(getMessageTimeDisplay(time)).toBe(
      thisYear.toLocaleDateString([], {month: 'short', day: 'numeric'}),
    );
  });

  it('should return the year if the date is last year', () => {
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const time = lastYear.getTime();
    expect(getMessageTimeDisplay(time)).toBe(
      lastYear.toLocaleDateString([], {year: 'numeric'}),
    );
  });

  it('should return the year if the date is 2 years ago', () => {
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const time = twoYearsAgo.getTime();
    expect(getMessageTimeDisplay(time)).toBe(
      twoYearsAgo.toLocaleDateString([], {year: 'numeric'}),
    );
  });
});
