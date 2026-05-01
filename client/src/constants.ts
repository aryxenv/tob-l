import type { TabValue } from "./types";

export const API_BASE =
  (import.meta as any).env.VITE_API_BASE ?? "http://localhost:8000/api";

export const TABS: { value: TabValue; label: string; href: string }[] = [
  { value: "calculate", label: "Calculate", href: "/" },
  { value: "brokers", label: "Brokers", href: "/brokers" },
  { value: "currency", label: "Currency", href: "/currency" },
  { value: "docs", label: "Docs", href: "/docs" },
];
