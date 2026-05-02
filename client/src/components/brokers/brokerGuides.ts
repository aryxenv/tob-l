import type { CollectionEntry } from "astro:content";
import { placeholderLogoSrc } from "../ui/logoPlaceholder";
import boleroLogoSrc from "./logos/bolero.svg?url";
import buxLogoSrc from "./logos/bux.svg?url";
import degiroFrLogoSrc from "./logos/degiro-fr.svg?url";
import degiroNlLogoSrc from "./logos/degiro-nl.svg?url";
import easybrokerLogoSrc from "./logos/easybroker.svg?url";
import etoroLogoSrc from "./logos/etoro.svg?url";
import ingSelfInvestLogoSrc from "./logos/ing-self-invest.svg?url";
import interactiveBrokersLogoSrc from "./logos/interactive-brokers.svg?url";
import keytradeBankLogoSrc from "./logos/keytrade-bank.svg?url";
import lynxLogoSrc from "./logos/lynx.svg?url";
import medirectLogoSrc from "./logos/medirect.svg?url";
import mexemLogoSrc from "./logos/mexem.svg?url";
import reBelLogoSrc from "./logos/re-bel.svg?url";
import saxoBankLogoSrc from "./logos/saxo-bank.svg?url";
import tradeRepublicLogoSrc from "./logos/trade-republic.svg?url";
import trading212LogoSrc from "./logos/trading-212.svg?url";
import { slugifyBrokerName } from "./brokerSlug";
import type { BrokerSummary } from "./brokerTypes";

type BrokerGuideEntry = CollectionEntry<"brokerGuides">;

const brokerLogoSrcById: Record<string, string> = {
  bolero: boleroLogoSrc,
  bux: buxLogoSrc,
  "degiro-fr": degiroFrLogoSrc,
  "degiro-nl": degiroNlLogoSrc,
  easybroker: easybrokerLogoSrc,
  etoro: etoroLogoSrc,
  "ing-self-invest": ingSelfInvestLogoSrc,
  "interactive-brokers": interactiveBrokersLogoSrc,
  "keytrade-bank": keytradeBankLogoSrc,
  lynx: lynxLogoSrc,
  medirect: medirectLogoSrc,
  mexem: mexemLogoSrc,
  "re-bel": reBelLogoSrc,
  "saxo-bank": saxoBankLogoSrc,
  "trade-republic": tradeRepublicLogoSrc,
  "trading-212": trading212LogoSrc,
};

export const getBrokerHref = (brokerId: string) => `/brokers/${brokerId}`;

export const getBrokerLogoSrc = (brokerId: string, logoSrc?: string) =>
  logoSrc ?? brokerLogoSrcById[brokerId] ?? placeholderLogoSrc;

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
        logoSrc: getBrokerLogoSrc(guide.id, guide.data.logoSrc),
        searchAliases: guide.data.searchAliases,
      };
    });
