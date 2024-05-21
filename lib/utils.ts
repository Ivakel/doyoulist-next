import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getDate() {
  const date = new Date();
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const weekday = weekdays[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return { day, weekday, month };
}

export function getCurrentTime() {
  const d = new Date();
  let time = d.getTime();
}
