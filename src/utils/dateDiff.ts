export function dateDiff(fromDate: string) {
  const initialDate = new Date(fromDate);
  const now = new Date(Date.now());
  const diffInTime = now.getTime() - initialDate.getTime();

  const minutes = Math.floor(diffInTime / 1000 / 60);
  return minutes;
}
