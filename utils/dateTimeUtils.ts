import { format, formatDistance, formatDuration as formatDur, intervalToDuration } from 'date-fns';

/**
 * Format a date string into a time string (e.g., "14:30")
 */
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'HH:mm');
};

/**
 * Format a duration between two date strings (e.g., "45m")
 */
export const formatDuration = (startDateString: string, endDateString: string): string => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  
  const duration = intervalToDuration({
    start: startDate,
    end: endDate,
  });
  
  if (duration.hours && duration.hours > 0) {
    return `${duration.hours}h ${duration.minutes}m`;
  }
  
  return `${duration.minutes}m`;
};

/**
 * Format a timestamp relative to current time (e.g., "5 minutes ago")
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  return formatDistance(date, new Date(), { addSuffix: true });
};

/**
 * Check if a date is today
 */
export const isToday = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Format a date string for display (e.g., "Today" or "Mon, 15 May")
 */
export const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  
  if (isToday(dateString)) {
    return 'Today';
  }
  
  return format(date, 'EEE, d MMM');
};