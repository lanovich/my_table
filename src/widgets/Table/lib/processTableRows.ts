import { sortRows } from "@/shared/lib";
import { BooleanFilterValue } from "@/shared/lib/filtering";
import { Column, RowData } from "@/widgets/Table/model";

export function processTableRows<T extends RowData>({
  rows,
  columns,
  filters,
  sortKey,
  sortDirection,
  getChildren,
}: {
  rows: T[];
  columns: Column<T>[];
  filters: Record<string, BooleanFilterValue>;
  sortKey: string | null;
  sortDirection: "asc" | "desc" | null;
  getChildren?: (row: T) => T[];
}) {
  const activeBooleanFilters = columns.filter(
    (col) => col.filter?.type === "boolean" && filters[String(col.key)] != null,
  );

  const filteredRows =
    activeBooleanFilters.length === 0
      ? rows
      : rows.filter((row) =>
          activeBooleanFilters.every((col) => {
            const value = filters[String(col.key)] as BooleanFilterValue;

            return Boolean(row[col.key]) === value;
          }),
        );

  const rootRows = getChildren
    ? filteredRows.filter((r) => r.parentId === 0)
    : filteredRows;

  if (!sortKey) return { rootRows, filteredRows };

  const key = columns.find((c) => String(c.key) === sortKey)?.key;

  return {
    filteredRows,
    rootRows: sortRows(rootRows, columns, key as keyof T | null, sortDirection),
  };
}
