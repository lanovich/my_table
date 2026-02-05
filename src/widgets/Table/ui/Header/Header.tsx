import styles from "./Header.module.css";

import { Column } from "@/widgets/Table/model";
import { ColumnHeader } from "@/widgets/Table/ui";
import { BooleanFilterValue } from "@/shared/lib";

interface HeaderProps<T> {
  columns: Column<T>[];
  sortKey: string | null;
  sortDirection: "asc" | "desc" | null;
  filters: Record<string, BooleanFilterValue>;
  onSort: (key: keyof T) => void;
  onFilter: (columnKey: string, value: BooleanFilterValue) => void;
}

export function Header<T>({
  columns,
  sortKey,
  sortDirection,
  filters,
  onSort,
  onFilter,
}: HeaderProps<T>) {
  return (
    <thead className={styles.header}>
      <tr>
        {columns.map((col) => (
          <ColumnHeader
            key={col.key as string}
            column={col}
            sortKey={sortKey}
            sortDirection={sortDirection}
            filterValue={filters[String(col.key)]}
            onSort={() => col.sort && onSort(col.key)}
            onFilter={(value) => onFilter(String(col.key), value)}
          />
        ))}
      </tr>
    </thead>
  );
}
