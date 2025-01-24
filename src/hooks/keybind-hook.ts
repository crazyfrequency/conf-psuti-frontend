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
      const modifiersMatch =
        (!(keys.includes("Ctrl") || event.ctrlKey || event.metaKey) || event.ctrlKey) &&
        (!keys.includes("Shift") || event.shiftKey) &&
        (!keys.includes("Alt") || event.altKey);

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
