import styles from "./Row.module.css";

import { useState, memo } from "react";
import clsx from "clsx";
import { RowData, Column } from "@/widgets/Table/model";
import { Cell, ExpandButton, TreeLines } from "@/shared/ui";
import { sortRows } from "@/shared/lib";

interface RowProps<T extends RowData> {
  row: T;
  columns: Column<T>[];
  depth?: number;
  isLast?: boolean;
  ancestorLines?: boolean[];
  getChildren?: (row: T) => T[];
  sortKey?: keyof T | null;
  sortDirection?: "asc" | "desc" | null;
  allFilteredRows?: T[];
}

function RowComponent<T extends RowData>({
  row,
  columns,
  depth = 0,
  isLast = true,
  ancestorLines = [],
  getChildren,
  sortKey,
  sortDirection,
  allFilteredRows = [],
}: RowProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);

  const children = getChildren ? getChildren(row) : [];
  const hasChildren = children.length > 0;

  const isParentVisible =
    allFilteredRows.length === 0 ||
    allFilteredRows.some((r) => r.id === row.id);

  const filteredChildren = isParentVisible
    ? allFilteredRows.length > 0
      ? children.filter((child) =>
          allFilteredRows.some((filtered) => filtered.id === child.id),
        )
      : children
    : [];

  const sortedChildren = sortRows(
    filteredChildren,
    columns,
    sortKey || null,
    sortDirection || null,
  );

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const childAncestorLines = depth > 0 ? [...ancestorLines, !isLast] : [];

  const renderFirstCell = (col: Column<T>) => (
    <td key={String(col.key)} className={styles.firstCell}>
      <TreeLines
        depth={depth}
        isLast={isLast}
        hasChildren={hasChildren}
        ancestorLines={ancestorLines}
      />
      {hasChildren && (
        <ExpandButton isExpanded={isExpanded} onClick={toggleExpand} />
      )}
      {!hasChildren && depth > 0 && <span className={styles.leafSpacer} />}
      <Cell row={row} column={col} asSpan />
    </td>
  );

  return (
    <>
      <tr className={clsx(styles.row)}>
        {columns.map((col, idx) =>
          idx === 0 ? (
            renderFirstCell(col)
          ) : (
            <Cell key={String(col.key)} row={row} column={col} />
          ),
        )}
      </tr>

      {isExpanded &&
        sortedChildren.map((child, idx) => (
          <Row
            key={child.id}
            row={child}
            columns={columns}
            depth={depth + 1}
            isLast={idx === sortedChildren.length - 1}
            ancestorLines={childAncestorLines}
            getChildren={getChildren}
            sortKey={sortKey}
            sortDirection={sortDirection}
            allFilteredRows={allFilteredRows}
          />
        ))}
    </>
  );
}

export const Row = memo(RowComponent) as typeof RowComponent;
