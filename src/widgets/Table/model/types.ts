import { BooleanFilterValue } from "@/shared/lib";

export type Column<T> = {
  key: keyof T;
  label: string;
  align?: "left" | "center" | "right";
  renderCell?: (row: T, key: keyof T) => React.ReactNode;
  sort?: (row: T) => string | number | boolean;
  filter?: {
    type: 'boolean';
    falseLabel?: string;
    trueLabel?: string;
    defaultValue?: BooleanFilterValue;
  };
};

export interface RowData {
  id: number;
  parentId?: number;
}

export interface TableState {
  sortKey: string | null;
  sortDirection: "asc" | "desc" | null;
  filters: Record<string, BooleanFilterValue>;
}
