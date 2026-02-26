import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    available: "bg-green-100 text-green-800",
    delivered: "bg-green-100 text-green-800",
    completed: "bg-green-100 text-green-800",
    paid: "bg-green-100 text-green-800",
    "in-transit": "bg-blue-100 text-blue-800",
    "in_transit": "bg-blue-100 text-blue-800",
    dispatched: "bg-blue-100 text-blue-800",
    processing: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
    assigned: "bg-yellow-100 text-yellow-800",
    "on-leave": "bg-orange-100 text-orange-800",
    "on_leave": "bg-orange-100 text-orange-800",
    inactive: "bg-gray-100 text-gray-800",
    maintenance: "bg-orange-100 text-orange-800",
    "out-of-service": "bg-red-100 text-red-800",
    cancelled: "bg-red-100 text-red-800",
    terminated: "bg-red-100 text-red-800",
    overdue: "bg-red-100 text-red-800",
  };
  return colors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
}
