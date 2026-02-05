import styles from "./Table.module.css";

import { useState, useCallback, useMemo } from "react";
import { Column, RowData, TableState } from "@/widgets/Table/model";
import { BooleanFilterValue, buildInitialFilters } from "@/shared/lib";
import { Row, Header } from "@/widgets/Table/ui";
import { processTableRows } from "@/widgets/Table/lib";

interface TableProps<T extends RowData> {
  columns: Column<T>[];
  rows: T[];
  getChildren?: (row: T) => T[];
}

export function Table<T extends RowData>({
  columns,
  rows,
  getChildren,
}: TableProps<T>) {
  const [state, setState] = useState<TableState>(() => ({
    sortKey: null,
    sortDirection: null,
    filters: buildInitialFilters(columns),
  }));

  const handleSort = useCallback((key: keyof T) => {
    setState((prev) => {
      const keyString = String(key);

      if (prev.sortKey !== keyString) {
        return { ...prev, sortKey: keyString, sortDirection: "asc" };
      }

      if (prev.sortDirection === "asc") {
        return { ...prev, sortDirection: "desc" };
      }

      return { ...prev, sortKey: null, sortDirection: null };
    });
  }, []);

  const handleFilter = useCallback(
    (columnKey: string, value: BooleanFilterValue) => {
      setState((prev) => ({
        ...prev,
        filters: {
          ...prev.filters,
          [columnKey]: value,
        },
      }));
    },
    [],
  );

  const { rootRows, filteredRows } = useMemo(
    () =>
      processTableRows({
        rows,
        columns,
        filters: state.filters,
        sortKey: state.sortKey,
        sortDirection: state.sortDirection,
        getChildren,
      }),
    [rows, columns, state, getChildren],
  );

  return (
    <table className={styles.table}>
      <Header
        columns={columns}
        sortKey={state.sortKey}
        sortDirection={state.sortDirection}
        filters={state.filters}
        onSort={handleSort}
        onFilter={handleFilter}
      />

      <tbody>
        {rootRows.map((row) => (
          <Row
            key={row.id}
            row={row}
            columns={columns}
            getChildren={getChildren}
            sortKey={state.sortKey as keyof T | null}
            sortDirection={state.sortDirection}
            allFilteredRows={filteredRows}
          />
        ))}
      </tbody>
    </table>
  );
}
