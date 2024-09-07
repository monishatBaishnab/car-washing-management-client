export const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    // Adjust hours to display 12-hour format while retaining 24-hour logic
    const hoursFormatted = hours % 12 || 12; // Convert 0 (midnight) or 12 (noon) to 12
    const timeFormatted = `${hoursFormatted}:${minutes} ${ampm}`;

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    return `${formattedDate} : ${timeFormatted}`;
};
