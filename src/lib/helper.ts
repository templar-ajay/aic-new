import { postcodeValidator } from "postcode-validator";

export const validateUsPostCode = (value: string) => {
  return postcodeValidator(value, "US"); // returns true
};

const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const dateValidator = (value: string) => {
  const [month, day, year] = value.split("-").map(Number);

  // Ensure that the year, month, and day are valid numbers
  if (isNaN(year) || isNaN(month) || isNaN(day)) return false;

  // Get current date and the date 150 years ago
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const minYear = currentYear - 150;

  // Check if the year is valid (not greater than current year and not less than 150 years ago)
  if (year > currentYear || year < minYear) return false;

  // Check if the month is valid (between 01 and 12)
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
  //@ts-expect-error ....
  if (day < 1 || day > daysInMonth[month]) return false;

  // Validate that the date is not greater than today's date
  const inputDate = new Date(year, month - 1, day); // Month is 0-indexed in JS Date
  if (inputDate > currentDate) return false;

  return true;
};

// Helper function to check for leap year

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

export const handleAutoSelect = (
  filteredOptions: string[],
  field: any,
  setValue: any
) => {
  if (filteredOptions.length === 1) {
    setValue(field.name, filteredOptions[0]); // Auto-select when one option is left
  }
  return filteredOptions;
};
