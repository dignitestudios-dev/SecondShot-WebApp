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
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthIndex = date.getMonth(); // getMonth() returns a number between 0 and 11
    return months[monthIndex]; // Returns the name of the month
  }
  