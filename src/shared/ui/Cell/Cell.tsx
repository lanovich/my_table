import styles from "./Cell.module.css";

import { memo } from "react";

interface CellProps<T> {
  row: T;
  column: {
    key: keyof T;
    align?: "left" | "center" | "right";
    renderCell?: (row: T, key: keyof T) => React.ReactNode;
  };
  asSpan?: boolean;
}

function getCellContent<T>(
  row: T,
  column: CellProps<T>["column"],
): React.ReactNode {
  if (column.renderCell) {
    return column.renderCell(row, column.key);
  }

  const val = row[column.key];

  if (val === null || val === undefined) return null;
  if (
    typeof val === "string" ||
    typeof val === "number" ||
    typeof val === "boolean"
  ) {
    return val;
  }

  return JSON.stringify(val);
}

function CellComponent<T>({ row, column, asSpan }: CellProps<T>) {
  const content = getCellContent(row, column);
  const align = column.align || "left";

  if (asSpan) {
    return (
      <span className={styles.content} style={{ textAlign: align }}>
        {content}
      </span>
    );
  }

  return (
    <td className={styles.cell} style={{ textAlign: align }}>
      {content}
    </td>
  );
}

export const Cell = memo(CellComponent) as typeof CellComponent;
