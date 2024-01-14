export const formatDate = (date: Date) => {
  if (!(date instanceof Date)) {
    return "";
  }
  return date.toLocaleDateString("us", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
};
