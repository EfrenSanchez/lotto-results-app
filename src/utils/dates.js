import { atLeastTwoFigures } from "./numberHandler";

export function getFridaysInMonth(month, year) {
  let date = new Date(year, month, 1),
    days = [];

  while (date.getMonth() === month) {
    if (date.getDay() === 5) days = [...days, new Date(date)];

    date.setDate(date.getDate() + 1);
  }

  return days;
};

export function dateParser({ year, month, day }) {
  return `${year}${atLeastTwoFigures(month)}${atLeastTwoFigures(day)}`;
} 


