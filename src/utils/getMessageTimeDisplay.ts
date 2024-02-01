import {translate} from '../i18n';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const getMessageTimeDisplay = (time: number): string => {
  const date = new Date(time);
  // If today, show time
  // If yesterday, show yesterday
  // If this year, show month and day
  // Otherwise, show year
  if (date.getTime() > new Date().getTime() - DAY_IN_MS) {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  if (date.getTime() > new Date().getTime() - 2 * DAY_IN_MS) {
    return translate('yesterday');
  }
  if (date.getFullYear() === new Date().getFullYear()) {
    if (date.getMonth() === new Date().getMonth()) {
      return date.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
      });
    } else {
      return date.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
      });
    }
  }
  return date.toLocaleDateString([], {
    year: 'numeric',
  });
};
