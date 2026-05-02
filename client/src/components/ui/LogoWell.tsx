import { makeStyles, mergeClasses } from "./fluent";
import { placeholderLogoSrc } from "./logoPlaceholder";

const useStyles = makeStyles({
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "64px",
    height: "64px",
    flexShrink: 0,
  },
  image: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    filter: "var(--broker-logo-filter)",
  },
});

interface LogoWellProps {
  name: string;
  logoSrc?: string;
  className?: string;
}

export const LogoWell = ({ name, logoSrc, className }: LogoWellProps) => {
  const styles = useStyles();

  return (
    <span className={mergeClasses(styles.root, className)} aria-hidden="true">
      <img
        className={styles.image}
        src={logoSrc ?? placeholderLogoSrc}
        alt=""
        loading="lazy"
      />
    </span>
  );
};
