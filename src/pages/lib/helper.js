export const getYearsArray = (minYear = 1990, maxFutureYears = 15) => {
  const currentYear = new Date().getFullYear();
  const years = [{ value: "", label: "Select Year" }];

  for (let year = minYear; year <= currentYear + maxFutureYears; year++) {
    years.push({ value: `${year}`, label: `${year}` });
  }

  return years;
};

export const getStartYearsArray = (minYear = 1990) => {
  const currentYear = new Date().getFullYear();
  const years = [{ value: "", label: "Select Year" }];

  for (let year = minYear; year <= currentYear; year++) {
    years.push({ value: `${year}`, label: `${year}` });
  }

  return years;
};

export function getYear(dateString) {
  const date = new Date(dateString);
  return date.getFullYear().toString();
}

export function getMonth(dateString) {
  const date = new Date(dateString);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = date.getMonth(); // getMonth() returns a number between 0 and 11
  return months[monthIndex]; // Returns the name of the month
}

// lib/helper.js

// Phone number formatting function
// lib/helper.js

export const phoneFormater = (input) => {
  if (!input) return "";

  // Remove all non-numeric characters
  let cleaned = input.replace(/\D/g, "");

  // Agar country code (1) laga hua hai aur length 11 hai, to usse hata do
  if (cleaned.length === 11 && cleaned.startsWith("1")) {
    cleaned = cleaned.slice(1);
  }

  if (cleaned.length > 3 && cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else if (cleaned.length > 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  } else if (cleaned.length > 0) {
    return `(${cleaned}`;
  }

  return cleaned;
};



