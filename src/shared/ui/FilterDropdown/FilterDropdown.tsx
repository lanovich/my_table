import styles from "./FilterDropdown.module.css";

import { useRef, useState, useLayoutEffect } from "react";
import clsx from "clsx";
import { useOnClickOutside } from "@/shared/hooks";
import { FilterIcon } from "@/shared/ui";

interface FilterDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  isActive?: boolean;
}

export function FilterDropdown({
  isOpen,
  onToggle,
  onClose,
  children,
  title,
  isActive = false,
}: FilterDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<React.CSSProperties>({});

  useOnClickOutside(
    dropdownRef as unknown as React.RefObject<HTMLElement>,
    onClose,
  );

  useLayoutEffect(() => {
    const updatePosition = () => {
      if (isOpen && dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        const popupWidth = 200;
        const screenWidth = window.innerWidth;
        const scrollY = window.scrollY;

        let left = rect.left + window.scrollX;
        if (left + popupWidth > screenWidth) {
          left = screenWidth - popupWidth - 16 + window.scrollX;
        }
        if (left < 16 + window.scrollX) {
          left = 16 + window.scrollX;
        }

        const newPosition = {
          "--dropdown-top": `${rect.bottom + 4 + scrollY}px`,
          "--dropdown-left": `${left}px`,
        } as React.CSSProperties;

        setPosition(newPosition);
      }
    };

    updatePosition();

    if (isOpen) {
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={styles.container}>
      <button
        type="button"
        className={clsx(styles.trigger, isActive && styles.triggerActive)}
        onClick={onToggle}
        title={title}
      >
        <div className={styles.triggerContainer}>
          <FilterIcon isActive={isActive} />
          {isActive && <span className={styles.badge}>1</span>}
        </div>
      </button>

      {isOpen && (
        <div className={styles.dropdown} style={position}>
          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
