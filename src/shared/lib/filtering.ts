import { Column } from "@/widgets/Table/model";

export function buildInitialFilters<T>(columns: Column<T>[]) {
  const filters: Record<string, BooleanFilterValue> = {};

  columns.forEach((col) => {
    if (col.filter?.type === "boolean") {
      filters[String(col.key)] = col.filter.defaultValue ?? null;
    }
  });

  return filters;
}

export type BooleanFilterValue = boolean | null;
