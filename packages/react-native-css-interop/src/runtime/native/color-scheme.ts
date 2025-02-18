import { Appearance, useColorScheme as useRNColorScheme } from "react-native";
import { createSignal } from "../signals";
import { INTERNAL_RESET } from "../../shared";
import { resetDefaultVariables, resetRootVariables } from "./variables";

export const colorScheme = createColorScheme(Appearance);

export function useColorScheme() {
  useRNColorScheme();
  return {
    get: colorScheme.get,
    set: colorScheme.set,
    toggle: colorScheme.toggle,
  };
}

function createColorScheme(appearance: typeof Appearance) {
  let isSystem = true;
  const signal = createSignal<"light" | "dark">(
    appearance.getColorScheme() ?? "light",
  );

  const set = (colorScheme: "light" | "dark" | "system") => {
    let newColorScheme;
    if (colorScheme === "system") {
      newColorScheme = appearance.getColorScheme() ?? "light";
    } else {
      newColorScheme = colorScheme;
    }

    signal.set(newColorScheme);
    appearance.setColorScheme(newColorScheme);
    resetRootVariables(newColorScheme);
    resetDefaultVariables(newColorScheme);
  };

  const toggle = () => {
    if (signal.get() === "light") {
      set("dark");
    } else {
      set("light");
    }
  };

  let listener = appearance.addChangeListener(({ colorScheme }) => {
    if (isSystem) {
      set(colorScheme ?? "light");
    }
  });

  const reset = (appearance: typeof Appearance) => {
    listener.remove();
    listener = appearance.addChangeListener(({ colorScheme }) => {
      if (isSystem) {
        signal.set(colorScheme ?? "light");
      }
    });
    isSystem = true;
    signal.set(appearance.getColorScheme() ?? "light");
  };

  return { get: signal.get, set, toggle, [INTERNAL_RESET]: reset };
}
