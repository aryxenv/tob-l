import { useMemo, useState } from "react";
import { BrokerCard } from "./BrokerCard";
import { DirectoryCardGrid } from "../ui/DirectoryCardGrid";
import { DirectorySearchField } from "../ui/DirectorySearchField";
import { EmptyState } from "../ui/EmptyState";
import { FluentThemeProvider } from "../ui/FluentThemeProvider";
import { Text, makeStyles, tokens } from "../ui/fluent";
import type { BrokerSummary } from "./brokerTypes";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gap: tokens.spacingVerticalXL,
    backgroundColor: "transparent",
  },
  resultSummary: {
    color: tokens.colorNeutralForeground2,
  },
});

interface BrokerDirectoryIslandProps {
  brokers: readonly BrokerSummary[];
}

const normalizeSearchValue = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en-US");

const getBrokerSearchText = (broker: BrokerSummary) =>
  normalizeSearchValue(
    [broker.name, ...(broker.searchAliases ?? [])].join(" "),
  );

const formatResultSummary = (count: number, query: string) => {
  const brokerLabel = count === 1 ? "broker" : "brokers";

  return query
    ? `${count} ${brokerLabel} matching "${query}"`
    : `${count} ${brokerLabel} available`;
};

export default function BrokerDirectoryIsland({
  brokers,
}: BrokerDirectoryIslandProps) {
  return (
    <FluentThemeProvider>
      <BrokerDirectoryContent brokers={brokers} />
    </FluentThemeProvider>
  );
}

const BrokerDirectoryContent = ({ brokers }: BrokerDirectoryIslandProps) => {
  const styles = useStyles();
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeSearchValue(query.trim());
  const filteredBrokers = useMemo(
    () =>
      normalizedQuery
        ? brokers.filter((broker) =>
            getBrokerSearchText(broker).includes(normalizedQuery),
          )
        : brokers,
    [brokers, normalizedQuery],
  );
  const resultSummary = formatResultSummary(filteredBrokers.length, query.trim());

  return (
    <div className={styles.root}>
      <DirectorySearchField
        id="broker-search"
        label="Search brokers"
        onChange={setQuery}
        placeholder="Search by broker name"
        value={query}
      />
      <Text
        as="p"
        aria-live="polite"
        className={styles.resultSummary}
        size={300}
      >
        {resultSummary}
      </Text>
      {filteredBrokers.length > 0 ? (
        <DirectoryCardGrid ariaLabel="Broker results">
          {filteredBrokers.map((broker) => (
            <BrokerCard
              href={broker.href}
              key={broker.id}
              logoSrc={broker.logoSrc}
              name={broker.name}
            />
          ))}
        </DirectoryCardGrid>
      ) : (
        <EmptyState
          title="No brokers found"
          message="Try another broker name or clear the search."
        />
      )}
    </div>
  );
};
