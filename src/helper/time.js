export const createDateTimeString = timestamp => {
    if (!timestamp) return null
    const dateTime = new Date(timestamp.toMillis())
    return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`
  }