import {
  Button,
  FluentProvider,
  Menu,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
  makeStyles,
  tokens,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import {
  Desktop20Regular,
  WeatherMoon20Regular,
  WeatherSunny20Regular,
} from "@fluentui/react-icons";
import { useEffect, useMemo, useState } from "react";

type ThemePreference = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "tob-l-theme";
const THEME_PREFERENCES = new Set<ThemePreference>(["light", "dark", "system"]);

const useStyles = makeStyles({
  provider: {
    display: "contents",
  },
  trigger: {
    color: tokens.colorNeutralForeground1,
  },
});

function isThemePreference(value: string | undefined): value is ThemePreference {
  return value !== undefined && THEME_PREFERENCES.has(value as ThemePreference);
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference === "system" ? getSystemTheme() : preference;
}

function applyThemePreference(preference: ThemePreference): ResolvedTheme {
  const resolvedTheme = resolveTheme(preference);
  const root = document.documentElement;

  root.dataset.theme = resolvedTheme;
  root.dataset.themePreference = preference;
  root.style.colorScheme = resolvedTheme;

  return resolvedTheme;
}

function readStoredPreference(): ThemePreference {
  try {
    const storedPreference = window.localStorage.getItem(STORAGE_KEY);

    return isThemePreference(storedPreference ?? undefined)
      ? storedPreference
      : "system";
  } catch (error) {
    console.warn("TOB-L could not read the saved theme preference.", error);
    return "system";
  }
}

function savePreference(preference: ThemePreference) {
  try {
    window.localStorage.setItem(STORAGE_KEY, preference);
  } catch (error) {
    console.warn("TOB-L could not save the theme preference.", error);
  }
}

function getPreferenceLabel(preference: ThemePreference) {
  switch (preference) {
    case "light":
      return "Light";
    case "dark":
      return "Dark";
    case "system":
      return "System";
  }
}

const ThemeMenu = () => {
  const styles = useStyles();
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const storedPreference = readStoredPreference();

    savePreference(storedPreference);
    setPreference(storedPreference);
    setResolvedTheme(applyThemePreference(storedPreference));
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = () => {
      if (preference === "system") {
        setResolvedTheme(applyThemePreference("system"));
      }
    };

    mediaQuery.addEventListener("change", syncSystemTheme);

    return () => mediaQuery.removeEventListener("change", syncSystemTheme);
  }, [preference]);

  const fluentTheme = resolvedTheme === "dark" ? webDarkTheme : webLightTheme;
  const TriggerIcon = useMemo(() => {
    if (preference === "system") {
      return Desktop20Regular;
    }

    return resolvedTheme === "dark"
      ? WeatherMoon20Regular
      : WeatherSunny20Regular;
  }, [preference, resolvedTheme]);

  const selectPreference = (nextPreference: ThemePreference) => {
    setPreference(nextPreference);
    savePreference(nextPreference);
    setResolvedTheme(applyThemePreference(nextPreference));
  };

  const preferenceLabel = getPreferenceLabel(preference);

  return (
    <FluentProvider className={styles.provider} theme={fluentTheme}>
      <Menu
        checkedValues={{ theme: [preference] }}
        onCheckedValueChange={(_, data) => {
          const nextPreference = data.checkedItems[0];

          if (isThemePreference(nextPreference)) {
            selectPreference(nextPreference);
          }
        }}
      >
        <MenuTrigger disableButtonEnhancement>
          <Button
            appearance="subtle"
            aria-label={`Theme: ${preferenceLabel}`}
            className={styles.trigger}
            icon={<TriggerIcon />}
            shape="square"
            title={`Theme: ${preferenceLabel}`}
          />
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItemRadio
              icon={<Desktop20Regular />}
              name="theme"
              value="system"
            >
              System
            </MenuItemRadio>
            <MenuItemRadio
              icon={<WeatherSunny20Regular />}
              name="theme"
              value="light"
            >
              Light
            </MenuItemRadio>
            <MenuItemRadio
              icon={<WeatherMoon20Regular />}
              name="theme"
              value="dark"
            >
              Dark
            </MenuItemRadio>
          </MenuList>
        </MenuPopover>
      </Menu>
    </FluentProvider>
  );
};

export default ThemeMenu;
