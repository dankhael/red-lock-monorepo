export const formatDate = (dateString) => {
  if (!dateString) {
    return 'Unknown Date'; // Fallback for missing or invalid dates
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Invalid Date'; // Fallback for invalid date formats
  }

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};