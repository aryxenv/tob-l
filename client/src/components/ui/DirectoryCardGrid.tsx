import { Children, type ReactNode } from "react";
import { makeStyles, mergeClasses, tokens } from "./fluent";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(min(100%, 240px), clamp(240px, 28vw, 320px)))",
    gap: tokens.spacingHorizontalL,
    justifyContent: "start",
    alignItems: "start",
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  item: {
    minWidth: 0,
  },
});

interface DirectoryCardGridProps {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
}

export const DirectoryCardGrid = ({
  children,
  ariaLabel,
  className,
}: DirectoryCardGridProps) => {
  const styles = useStyles();

  return (
    <ul className={mergeClasses(styles.root, className)} aria-label={ariaLabel}>
      {Children.map(children, (child) => (
        <li className={styles.item}>{child}</li>
      ))}
    </ul>
  );
};
