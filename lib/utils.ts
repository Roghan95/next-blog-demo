import { format } from "date-fns";

// Fonction permettant de formater une date au format anglophone mois, jour, année et heure.
export function formatDate(date: Date): string {
    return format(new Date(date), "MMMM do, yyyy HH:mm") ?? "Date not available";
}