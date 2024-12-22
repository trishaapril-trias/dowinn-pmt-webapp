export function sortByDateTime(array) {
    return array.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA; // Ascending order (earliest to latest)
    });
  }