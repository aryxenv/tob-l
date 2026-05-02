import { Input, makeStyles, tokens } from "./fluent";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gap: tokens.spacingVerticalS,
    maxWidth: "520px",
  },
  label: {
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  input: {
    width: "100%",
  },
});

interface DirectorySearchFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const DirectorySearchField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
}: DirectorySearchFieldProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root} role="search">
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <Input
        className={styles.input}
        id={id}
        onChange={(_, data) => onChange(data.value)}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};
