export function formatCurrency(value: number) {
    return value.toLocaleString("sk", {
        style: "currency",
        currency: "EUR"
    });
}


export function formatDate(date: Date) {
    return date.toLocaleString("sk", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "CET"
    });
}