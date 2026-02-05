import styles from "./ExpandButton.module.css";

import clsx from "clsx";
import { ChevronRight, ChevronDown } from "lucide-react";

interface ExpandButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  className?: string;
}

export const ExpandButton = ({
  isExpanded,
  onClick,
  className,
}: ExpandButtonProps) => (
  <button
    type="button"
    className={clsx(
      styles.button,
      isExpanded ? styles.open : styles.closed,
      className,
    )}
    onClick={onClick}
    title={
      !isExpanded ? "Показать вложенные строки" : "Скрыть вложенные строки"
    }
    aria-label={
      !isExpanded ? "Показать вложенные строки" : "Скрыть вложенные строки"
    }
  >
    {isExpanded ? (
      <ChevronDown size={14} strokeWidth={2} />
    ) : (
      <ChevronRight size={14} strokeWidth={2} />
    )}
  </button>
);
