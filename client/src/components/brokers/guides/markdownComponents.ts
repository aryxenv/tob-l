import MarkdownBlockquote from "./MarkdownBlockquote.astro";
import MarkdownCode from "./MarkdownCode.astro";
import MarkdownH1 from "./MarkdownH1.astro";
import MarkdownH2 from "./MarkdownH2.astro";
import MarkdownH3 from "./MarkdownH3.astro";
import MarkdownLink from "./MarkdownLink.astro";
import MarkdownListItem from "./MarkdownListItem.astro";
import MarkdownOrderedList from "./MarkdownOrderedList.astro";
import MarkdownParagraph from "./MarkdownParagraph.astro";
import MarkdownPre from "./MarkdownPre.astro";
import MarkdownTable from "./MarkdownTable.astro";
import MarkdownUnorderedList from "./MarkdownUnorderedList.astro";

export const markdownComponents = {
  h1: MarkdownH1,
  h2: MarkdownH2,
  h3: MarkdownH3,
  p: MarkdownParagraph,
  a: MarkdownLink,
  ul: MarkdownUnorderedList,
  ol: MarkdownOrderedList,
  li: MarkdownListItem,
  blockquote: MarkdownBlockquote,
  code: MarkdownCode,
  pre: MarkdownPre,
  table: MarkdownTable,
};
