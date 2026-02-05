import styles from "./ColumnHeader.module.css";

import { BooleanFilterValue } from "@/shared/lib";
import { FilterDropdown, BooleanSelect } from "@/shared/ui";
import clsx from "clsx";
import { useState } from "react";
import { Column } from "@/widgets/Table/model";
import { SortIcon } from "@/shared/ui";

interface ColumnHeaderProps<T> {
  column: Column<T>;
  sortKey: string | null;
  sortDirection: "asc" | "desc" | null;
  filterValue: BooleanFilterValue;
  onSort: () => void;
  onFilter: (value: BooleanFilterValue) => void;
}

export function ColumnHeader<T>({
  column,
  sortKey,
  sortDirection,
  filterValue,
  onSort,
  onFilter,
}: ColumnHeaderProps<T>) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const justifyContentMap = {
    left: "start",
    center: "center",
    right: "end",
  } as const;

  const isSortable = Boolean(column.sort);
  const hasFilter = Boolean(column.filter);
  const isActiveSort = sortKey === String(column.key);

  const handleHeaderClick = () => {
    if (!isSortable) return;
    onSort();
  };

  const toggleFilter = () => setIsFilterOpen((prev) => !prev);
  const closeFilter = () => setIsFilterOpen(false);

  return (
    <th
      key={String(column.key)}
      style={{ textAlign: column.align ?? "left" }}
      onClick={handleHeaderClick}
      className={clsx(
        isActiveSort && styles.activeAction,
        isSortable ? styles.sortable : undefined,
      )}
    >
      <span
        className={styles.labelContainer}
        style={{
          justifyContent: justifyContentMap[column.align ?? "left"],
        }}
      >
        <span>{column.label}</span>

        {isSortable && (
          <SortIcon
            isActive={isActiveSort}
            direction={isActiveSort ? sortDirection : null}
          />
        )}

        {hasFilter && (
          <FilterDropdown
            isOpen={isFilterOpen}
            onToggle={toggleFilter}
            onClose={closeFilter}
            title={column.label}
            isActive={filterValue !== null}
          >
            <BooleanSelect
              value={filterValue}
              onChange={onFilter}
              falseLabel={column.filter?.falseLabel}
              trueLabel={column.filter?.trueLabel}
            />
          </FilterDropdown>
        )}
      </span>
    </th>
  );
}
