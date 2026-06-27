export const formatTimeDifference = (createdAt:Date) => {
  const now = new Date();
  const createdDate = new Date(createdAt);

  const diffMs = now - createdDate;

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));

  // Less than 1 hour
  if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
  }

  // Less than 24 hours
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  // Between 24 and 48 hours
  if (hours < 48) {
    return "Yesterday";
  }

  // More than 48 hours
  const isCurrentYear =
    createdDate.getFullYear() === now.getFullYear();

  return createdDate.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    ...(isCurrentYear ? {} : { year: "numeric" }),
  });
};

 export const capitalizeWords = (text:string) => {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
