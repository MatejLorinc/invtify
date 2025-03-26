export function formatCurrency(value: number) {
    return value.toLocaleString("sk", {
        style: "currency",
        currency: "EUR"
    });
}

export function formatPercentage(value: number) {
    return new Intl.NumberFormat("sk-SK", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value / 100);
}

export function formatDate(date: Date) {
    return date.toLocaleString("sk", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "CET"
    });
}

export function isoToDate(dateString: string) {
    const formattedDateString = dateString.replace(/(\+\d{2}):(\d{2})/, "$1$2"); // Convert "+00:00" to "+0000"
    return new Date(formattedDateString);
}