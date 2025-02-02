import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export function useEnhanceLinks() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const rootElement = editor.getRootElement();
    if (!rootElement) return;

    // Функция для добавления атрибута ко всем ссылкам
    const addAttributeToLinks = () => {
      const links = rootElement.querySelectorAll("a");
      links.forEach((link) => {
        if (!link.hasAttribute("data-prevent-nprogress")) {
          link.setAttribute("data-prevent-nprogress", "true");
        }
      });
    };

    // Создаем MutationObserver для отслеживания изменений в DOM
    const observer = new MutationObserver(() => {
      addAttributeToLinks();
    });

    observer.observe(rootElement, {
      childList: true,
      subtree: true,
    });

    // Добавляем атрибут сразу при монтировании
    addAttributeToLinks();

    return () => observer.disconnect();
  }, [editor]);

  return null;
}
