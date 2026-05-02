import {
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import {
  createDOMRenderer,
  FluentProvider,
  IdPrefixProvider,
  RendererProvider,
  SSRProvider,
  webDarkTheme,
  webLightTheme,
} from "./fluent";

type ResolvedTheme = "light" | "dark";

interface FluentThemeProviderProps {
  children: ReactNode;
}

const getCurrentDocument = () =>
  typeof document === "undefined" ? undefined : document;

const readResolvedTheme = (targetDocument: Document): ResolvedTheme =>
  targetDocument.documentElement.dataset.theme === "dark" ? "dark" : "light";

const useIsomorphicLayoutEffect =
  typeof document === "undefined" ? useEffect : useLayoutEffect;

export const FluentThemeProvider = ({ children }: FluentThemeProviderProps) => {
  const [targetDocument, setTargetDocument] = useState<Document | undefined>(
    () => getCurrentDocument(),
  );
  const [renderer, setRenderer] = useState(() =>
    createDOMRenderer(getCurrentDocument()),
  );

  useIsomorphicLayoutEffect(() => {
    const currentDocument = document;

    setTargetDocument(currentDocument);
    setRenderer(createDOMRenderer(currentDocument));
  }, []);

  return (
    <RendererProvider renderer={renderer} targetDocument={targetDocument}>
      <SSRProvider>
        <IdPrefixProvider value="tobl-">
          <FluentThemeProviderInner targetDocument={targetDocument}>
            {children}
          </FluentThemeProviderInner>
        </IdPrefixProvider>
      </SSRProvider>
    </RendererProvider>
  );
};

interface FluentThemeProviderInnerProps {
  children: ReactNode;
  targetDocument?: Document;
}

const FluentThemeProviderInner = ({
  children,
  targetDocument,
}: FluentThemeProviderInnerProps) => {
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  useIsomorphicLayoutEffect(() => {
    const currentDocument = targetDocument ?? document;
    const root = currentDocument.documentElement;
    const syncTheme = () => setResolvedTheme(readResolvedTheme(currentDocument));
    const observer = new MutationObserver(syncTheme);

    syncTheme();
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [targetDocument]);

  return (
    <FluentProvider
      style={{ backgroundColor: "transparent" }}
      targetDocument={targetDocument}
      theme={resolvedTheme === "dark" ? webDarkTheme : webLightTheme}
    >
      {children}
    </FluentProvider>
  );
};
