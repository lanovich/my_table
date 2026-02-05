import styles from "./BooleanSelect.module.css";

export type BooleanSelectValue = boolean | null;

interface BooleanSelectProps {
  value: BooleanSelectValue;
  onChange: (value: BooleanSelectValue) => void;
  falseLabel?: string;
  trueLabel?: string;
  allLabel?: string;
}

export function BooleanSelect({
  value,
  onChange,
  falseLabel = "Не активно",
  trueLabel = "Активно",
  allLabel = "Все",
}: BooleanSelectProps) {
  return (
    <select
      value={value === null ? "all" : value ? "true" : "false"}
      onChange={(e) => {
        const val = e.target.value;
        onChange(val === "all" ? null : val === "true");
      }}
      className={styles.select}
    >
      <option value="all">{allLabel}</option>
      <option value="false">{falseLabel}</option>
      <option value="true">{trueLabel}</option>
    </select>
  );
}
