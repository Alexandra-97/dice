import dayjs from "dayjs";

export const formatTimestampToTime = (ts: number) => {
  const isYesterday = dayjs(ts).isSame(dayjs().subtract(1, "day"), "day");

  if (isYesterday) {
    return dayjs().format("DD-MM-YYYY");
  }

  return dayjs(ts).format("HH:mm:ss");
};
