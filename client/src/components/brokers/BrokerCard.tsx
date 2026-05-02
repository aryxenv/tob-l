import { LogoWell } from "../ui/LogoWell";
import { makeStyles, mergeClasses, tokens } from "../ui/fluent";

const useStyles = makeStyles({
  root: {
    minWidth: 0,
  },
  link: {
    display: "grid",
    minHeight: "156px",
    alignItems: "center",
    justifyItems: "center",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    textAlign: "center",
    textDecorationLine: "none",
    transitionProperty: "border-color, box-shadow",
    transitionDuration: "180ms",
    transitionTimingFunction: "ease-out",

    ":hover": {
      borderTopColor: tokens.colorNeutralStroke1Hover,
      borderRightColor: tokens.colorNeutralStroke1Hover,
      borderBottomColor: tokens.colorNeutralStroke1Hover,
      borderLeftColor: tokens.colorNeutralStroke1Hover,
    },

    ":focus-visible": {
      borderTopColor: tokens.colorStrokeFocus2,
      borderRightColor: tokens.colorStrokeFocus2,
      borderBottomColor: tokens.colorStrokeFocus2,
      borderLeftColor: tokens.colorStrokeFocus2,
      boxShadow: `0 0 0 1px ${tokens.colorStrokeFocus2}`,
      outlineStyle: "none",
    },

    "@media (prefers-reduced-motion: reduce)": {
      transitionDuration: "0.01ms",
    },
  },
  name: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
});

interface BrokerCardProps {
  href: string;
  logoSrc: string;
  name: string;
  className?: string;
}

export const BrokerCard = ({
  href,
  logoSrc,
  name,
  className,
}: BrokerCardProps) => {
  const styles = useStyles();

  return (
    <article className={mergeClasses(styles.root, className)}>
      <a
        className={styles.link}
        href={href}
        aria-label={`Open ${name} broker guide`}
      >
        <LogoWell name={name} logoSrc={logoSrc} />
        <span className={styles.name}>{name}</span>
      </a>
    </article>
  );
};
