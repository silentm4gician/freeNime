/**
 * Format a date as YYYY-MM-DD
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  return date.toISOString().split("T")[0];
}

/**
 * Get an array of dates for the week containing the given date
 * @param {Date} date - The reference date
 * @returns {Date[]} Array of dates for the week
 */
export function getDaysOfWeek(date) {
  const result = [];
  const startOfWeek = new Date(date);

  // Set to the start of the week (Sunday)
  startOfWeek.setDate(date.getDate() - date.getDay());

  // Add each day of the week
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    result.push(day);
  }

  return result;
}

/**
 * Format a time difference as a human-readable string
 * @param {Date} date - The date to compare with now
 * @returns {string} Human-readable time difference
 */
export function formatTimeAgo(date) {
  const now = new Date();
  const diffMs = date - now;
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  // Future
  if (diffMs > 0) {
    if (diffMin < 60) return `in ${diffMin} minute${diffMin !== 1 ? "s" : ""}`;
    if (diffHour < 24) return `in ${diffHour} hour${diffHour !== 1 ? "s" : ""}`;
    if (diffDay < 7) return `in ${diffDay} day${diffDay !== 1 ? "s" : ""}`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  // Past
  const absDiffMin = Math.abs(diffMin);
  const absDiffHour = Math.abs(diffHour);
  const absDiffDay = Math.abs(diffDay);

  if (absDiffMin < 60)
    return `${absDiffMin} minute${absDiffMin !== 1 ? "s" : ""} ago`;
  if (absDiffHour < 24)
    return `${absDiffHour} hour${absDiffHour !== 1 ? "s" : ""} ago`;
  if (absDiffDay < 7)
    return `${absDiffDay} day${absDiffDay !== 1 ? "s" : ""} ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
