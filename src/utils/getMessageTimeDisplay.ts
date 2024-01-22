import {translate} from '../i18n';

export const getMessageTimeDisplay = (time: number): string => {
  const date = new Date(time);
  // If today, show time
  // If yesterday, show yesterday
  // If this year, show month and day
  // Otherwise, show year
  if (date.getFullYear() === new Date().getFullYear()) {
    if (date.getMonth() === new Date().getMonth()) {
      if (date.getDate() === new Date().getDate()) {
        return date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
      } else if (date.getDate() === new Date().getDate() - 1) {
        return translate('yesterday');
      } else {
        return date.toLocaleDateString([], {
          month: 'short',
          day: 'numeric',
        });
      }
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
