const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const dateValidator = (value: string) => {
  const [month, day, year] = value.split("-").map(Number);

  // Ensure that the year, month, and day are valid numbers
  if (isNaN(year) || isNaN(month) || isNaN(day)) return false;

  // Check if month is valid (between 01 and 12)
  if (month < 1 || month > 12) return false;

  // Handle day validation for each month, accounting for leap years
  const daysInMonth = {
    1: 31, // January
    2: isLeapYear(year) ? 29 : 28, // February
    3: 31, // March
    4: 30, // April
    5: 31, // May
    6: 30, // June
    7: 31, // July
    8: 31, // August
    9: 30, // September
    10: 31, // October
    11: 30, // November
    12: 31, // December
  };

  // Validate the day based on the month
  return day >= 1 && day <= daysInMonth[month];
};

// Custom filter function to match words starting with input value
export const matchWordStart = (option: string, inputValue: string) => {
  const inputLower = inputValue.toLowerCase().trim();

  // Split both the option and input into words
  const optionWords = option.toLowerCase().split(" ");
  const inputWords = inputLower.split(" ");

  // Match each input word with any word in the option (not just at the beginning)
  return inputWords.every((inputWord) =>
    optionWords.some((optionWord) => optionWord.startsWith(inputWord))
  );
};
