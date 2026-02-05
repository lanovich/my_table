import styles from "./TreeLines.module.css";

interface TreeLinesProps {
  depth: number;
  isLast: boolean;
  hasChildren: boolean;
  ancestorLines: boolean[];
}

export const TreeLines = ({
  depth,
  isLast,
  hasChildren,
  ancestorLines,
}: TreeLinesProps) => {
  if (depth === 0) return null;

  return (
    <span className={styles.container}>
      {ancestorLines.map((showLine, idx) => (
        <span
          key={idx}
          className={showLine ? styles.verticalLine : styles.spacer}
        />
      ))}

      <span
        className={
          isLast
            ? hasChildren
              ? styles.cornerWithChild
              : styles.corner
            : hasChildren
              ? styles.teeWithChild
              : styles.tee
        }
      />
    </span>
  );
};
