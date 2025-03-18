import { useEffect } from "react";

// Тип для описания комбинаций клавиш
type KeyComboOptions = {
  keyBind: string;
  callback: () => void;
  useCode?: boolean;
};

export function useKeyBind({ keyBind, callback, useCode = true }: KeyComboOptions) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keys = keyBind.split("+");
      const ctrlPressed = event.ctrlKey || event.metaKey;
      const shiftPressed = event.shiftKey;
      const altPressed = event.altKey;

      const modifiersMatch =
        (keys.includes("Ctrl") === ctrlPressed) &&
        (keys.includes("Shift") === shiftPressed) &&
        (keys.includes("Alt") === altPressed);

      const keyToCheck = keys[keys.length - 1];
      const keyMatch = useCode ? event.code === keyToCheck : event.key === keyToCheck;

      if (modifiersMatch && keyMatch) {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyBind, callback, useCode]);
}
