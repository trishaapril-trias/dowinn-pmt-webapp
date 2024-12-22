export function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
  
    // Format date
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase(); // Get abbreviated month
    const year = date.getFullYear();
  
    // Format time
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
  
    hours = hours % 12 || 12; // Convert to 12-hour format
    const formattedHours = hours.toString().padStart(2, "0");
  
    return `${day}-${month}-${year} / ${formattedHours}:${minutes}:${seconds} ${ampm}`;
  }
  