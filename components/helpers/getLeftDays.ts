export default function getLeftDays(targetDate: Date): number {
  if (targetDate instanceof Date) {
    const currentDate = new Date();
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  } else {
    return -1;
  }
}
