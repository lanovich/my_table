import styles from "./StatusBadge.module.css";

import clsx from "clsx";

interface StatusBadgeProps {
  isActive: boolean;
  label?: string;
  className?: string;
}

export const StatusBadge = ({
  isActive,
  label,
  className,
}: StatusBadgeProps) => {
  return (
    <span
      className={clsx(
        styles.badge,
        isActive ? styles.active : styles.inactive,
        className,
      )}
    >
      {label ?? (isActive ? "Active" : "Inactive")}
    </span>
  );
};
