import { DateValue } from "@heroui/react";
import { parseAbsoluteToLocal } from "@internationalized/date";

const standardTime = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  } else {
    return time;
  }
};

const toDateStandard = (date: DateValue) => {
  const year = date.year;
  const month = date.month;
  const day = date.day;

  const hour = "hour" in date ? date.hour : 0;
  const minute = "minute" in date ? date.minute : 0;
  const second = "second" in date ? date.second : 0;

  return `${year}-${standardTime(month)}-${standardTime(day)} ${standardTime(hour)}:${standardTime(minute)}:${standardTime(second)}`;
};

const toInputDate = (date: string) => {
  return parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);
};

const convertTime = (isoDate: string) => {
  const dateObject = new Date(isoDate);

  const date = dateObject.toLocaleString("id-ID", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });

  return `${date} WIB`;
};

export { toDateStandard, toInputDate, convertTime };
