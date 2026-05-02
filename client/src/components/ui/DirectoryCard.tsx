import { useId } from "react";
import { LogoWell } from "./LogoWell";
import { Card, CardHeader, Text, makeStyles, mergeClasses, tokens } from "./fluent";

const useStyles = makeStyles({
  article: {
    height: "100%",
  },
  card: {
    height: "100%",
    minHeight: "168px",
    padding: tokens.spacingHorizontalL,
  },
  header: {
    alignItems: "flex-start",
  },
  title: {
    margin: 0,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase500,
  },
  subtitle: {
    color: tokens.colorNeutralForeground2,
  },
  description: {
    marginTop: tokens.spacingVerticalL,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
});

interface DirectoryCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  logoSrc?: string;
  className?: string;
}

export const DirectoryCard = ({
  title,
  subtitle,
  description,
  logoSrc,
  className,
}: DirectoryCardProps) => {
  const styles = useStyles();
  const titleId = useId();

  return (
    <article
      className={mergeClasses(styles.article, className)}
      aria-labelledby={titleId}
    >
      <Card className={styles.card} appearance="outline">
        <CardHeader
          className={styles.header}
          image={<LogoWell name={title} logoSrc={logoSrc} />}
          header={
            <h3 className={styles.title} id={titleId}>
              {title}
            </h3>
          }
          description={
            subtitle ? (
              <Text className={styles.subtitle} size={300}>
                {subtitle}
              </Text>
            ) : undefined
          }
        />
        {description ? (
          <Text as="p" className={styles.description} size={300}>
            {description}
          </Text>
        ) : null}
      </Card>
    </article>
  );
};
