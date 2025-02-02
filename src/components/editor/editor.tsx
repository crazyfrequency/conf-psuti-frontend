import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { useLexicalEditable } from '@lexical/react/useLexicalEditable';
import { useEffect, useState } from 'react';

import { useCurrentLocale } from '@/locales/client';
import { CAN_USE_DOM } from '@lexical/utils';
import { toast } from 'sonner';
import { useSharedHistoryContext } from './context/history-context';
import LexicalAutoLinkPlugin from './plugins/auto-link-plugin';
import FloatingLinkEditorPlugin from './plugins/floating-link-editor-plugin';
import FloatingTextFormatToolbarPlugin from './plugins/floating-text-format-toolbar-plugin';
import LinkPlugin from './plugins/link-plugin';
import { useEnhanceLinks } from './plugins/link-plugin/bar-fix';
import ShortcutsPlugin from './plugins/shortcuts-plugin';
import EditorToolbar from "./plugins/toolbar";


export default function EditorMain({
  placeholder
}: Readonly<{
  placeholder: string
}>) {
  const locale = useCurrentLocale();
  const {historyState} = useSharedHistoryContext();
  const isEditable = useLexicalEditable();
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false);
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener('resize', updateViewPortWidth);

    return () => {
      window.removeEventListener('resize', updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  useEnhanceLinks();

  return (
    <>
      <EditorToolbar
        editor={editor}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
        setIsLinkEditMode={setIsLinkEditMode}
      />
      <div className="border border-t-0 rounded-b-lg relative bg-background editor-text">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="relative min-h-36 resize-y text-base editor-input outline-none outline-0 py-4 px-3 caret-secondary-foreground"
              aria-placeholder={placeholder}
              placeholder={
                <div className="absolute inline-block top-4 left-3 select-none pointer-events-none text-ellipsis">
                  {placeholder}
                </div>
              }
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ListPlugin />
        <CheckListPlugin />
        <ClearEditorPlugin onClear={() => toast.info(locale ? 'Успешно очищено' : 'Successfully cleared')} />
        <ClickableLinkPlugin disabled={isEditable} />
        <HistoryPlugin externalHistoryState={historyState} />
        <AutoFocusPlugin />
        <HorizontalRulePlugin />
        <LexicalAutoLinkPlugin />
        <FloatingLinkEditorPlugin
          anchorElem={floatingAnchorElem ?? undefined}
          isLinkEditMode={isLinkEditMode}
          setIsLinkEditMode={setIsLinkEditMode}
        />
        <FloatingTextFormatToolbarPlugin
          anchorElem={floatingAnchorElem ?? undefined}
          setIsLinkEditMode={setIsLinkEditMode}
        />
        <LinkPlugin hasLinkAttributes />
        <ShortcutsPlugin editor={editor} setIsLinkEditMode={setIsLinkEditMode} />
      </div>
    </>
  )
}
