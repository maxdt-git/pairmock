import dayjs from 'dayjs';

export const formatDateTime = (dateValue: string | Date) => {
  const date = dayjs(dateValue);
  if (!date.isValid()) {
    return { date: 'N/A', time: 'N/A' };
  }

  return {
    date: date.format('ddd, D MMM'), // "Tue, 25 Oct"
    time: date.format('HH:mm'), // "15:22"
  };
};  