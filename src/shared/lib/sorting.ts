import { Column } from "@/widgets/Table/model";

export function sortRows<T>(
  rows: T[],
  columns: Column<T>[],
  sortKey: keyof T | null,
  sortDirection: "asc" | "desc" | null,
): T[] {
  if (!sortKey || !sortDirection) {
    return rows;
  }

  const col = columns.find((c) => c.key === sortKey);
  const sorted = [...rows];

  sorted.sort((a, b) => {
    const aVal = col?.sort ? col.sort(a) : a[sortKey];
    const bVal = col?.sort ? col.sort(b) : b[sortKey];

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return sorted;
}
