import { Text, makeStyles, tokens } from "./fluent";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingHorizontalXXL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground2,
    textAlign: "center",
  },
  title: {
    color: tokens.colorNeutralForeground1,
  },
});

interface EmptyStateProps {
  title: string;
  message: string;
}

export const EmptyState = ({ title, message }: EmptyStateProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Text as="p" className={styles.title} weight="semibold">
        {title}
      </Text>
      <Text as="p" size={300}>
        {message}
      </Text>
    </div>
  );
};
