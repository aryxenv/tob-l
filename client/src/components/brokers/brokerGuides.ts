import type { CollectionEntry } from "astro:content";
import { placeholderLogoSrc } from "../ui/logoPlaceholder";
import { slugifyBrokerName } from "./brokerSlug";
import type { BrokerSummary } from "./brokerTypes";

type BrokerGuideEntry = CollectionEntry<"brokerGuides">;

export const getBrokerHref = (brokerId: string) => `/brokers/${brokerId}`;

const assertBrokerGuideSlug = (guide: BrokerGuideEntry) => {
  const expectedId = slugifyBrokerName(guide.data.name);

  if (guide.id !== expectedId) {
    throw new Error(
      `Broker guide "${guide.data.name}" must use "${expectedId}" as its folder slug, but found "${guide.id}".`,
    );
  }
};

export const getBrokerGuideSummaries = (
  guides: readonly BrokerGuideEntry[],
): BrokerSummary[] =>
  [...guides]
    .sort((left, right) => {
      const orderDifference =
        (left.data.order ?? Number.MAX_SAFE_INTEGER) -
        (right.data.order ?? Number.MAX_SAFE_INTEGER);

      return orderDifference || left.data.name.localeCompare(right.data.name);
    })
    .map((guide) => {
      assertBrokerGuideSlug(guide);

      return {
        id: guide.id,
        name: guide.data.name,
        href: getBrokerHref(guide.id),
        logoSrc: guide.data.logoSrc ?? placeholderLogoSrc,
        searchAliases: guide.data.searchAliases,
      };
    });
