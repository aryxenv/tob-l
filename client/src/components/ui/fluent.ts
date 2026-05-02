import * as Fluent from "@fluentui/react-components";

type FluentModule = typeof Fluent & {
  default?: typeof Fluent;
};

// Astro prerender can resolve Fluent through its CommonJS node condition.
const defaultExportKey = "default" as keyof FluentModule;
const fluent = ((Fluent as FluentModule)[defaultExportKey] ?? Fluent) as typeof Fluent;

export const {
  Card,
  CardHeader,
  createDOMRenderer,
  FluentProvider,
  IdPrefixProvider,
  Input,
  RendererProvider,
  SSRProvider,
  Text,
  makeStyles,
  mergeClasses,
  tokens,
  webDarkTheme,
  webLightTheme,
} = fluent;
