export default function addMinutesToDate(date: Date, minutes: number): Date {
  console.log(typeof date, date);

  return new Date(new Date(date).getTime() + minutes * 60000);
}
