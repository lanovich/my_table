import clsx from "clsx";
import { Filter } from "lucide-react";
import styles from "./FilterIcon.module.css";

interface FilterIconProps {
  isActive: boolean;
  className?: string;
}

export function FilterIcon({ isActive, className }: FilterIconProps) {
  return (
    <Filter
      size={14}
      className={clsx(styles.icon, isActive && styles.active, className)}
    />
  );
}
