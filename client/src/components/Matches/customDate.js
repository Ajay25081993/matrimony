export function customDate(isoDate) {
  const dateObj = new Date(isoDate);

  const day = dateObj.getUTCDate();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[dateObj.getUTCMonth()];
  const year = String(dateObj.getUTCFullYear()).slice(2);

  return `${day} ${month} ${year}`;
}

