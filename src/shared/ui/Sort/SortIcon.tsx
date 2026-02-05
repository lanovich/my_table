import styles from "./SortIcon.module.css";

import { ArrowDownUp, ArrowDown, ArrowUp } from "lucide-react";

interface SortIconProps {
  isActive: boolean;
  direction: "asc" | "desc" | null;
}

export function SortIcon({ isActive, direction }: SortIconProps) {
  if (!isActive)
    return <ArrowDownUp size={16} className={styles.inactiveSort} />;

  return (
    <>
      {direction === "asc" && (
        <ArrowDown size={16} className={styles.activeSort} />
      )}
      {direction === "desc" && (
        <ArrowUp size={16} className={styles.activeSort} />
      )}
    </>
  );
}
