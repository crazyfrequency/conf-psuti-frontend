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
import { SelectionAlwaysOnDisplay } from '@lexical/react/LexicalSelectionAlwaysOnDisplay';
import { useLexicalEditable } from '@lexical/react/useLexicalEditable';
import { useEffect, useState } from 'react';

import { useCurrentLocale } from '@/locales/client';
import { CAN_USE_DOM } from '@lexical/utils';
import { toast } from 'sonner';
import { useSharedHistoryContext } from './context/history-context';
import LexicalAutoLinkPlugin from './plugins/auto-link-plugin';
import CodeHighlightPlugin from './plugins/code-highlight-plugin';
import CollapsiblePlugin from './plugins/collapsible-plugin';
import DraggableBlockPlugin from './plugins/draggable-block-plugin';
import FloatingLinkEditorPlugin from './plugins/floating-link-editor-plugin';
import FloatingTextFormatToolbarPlugin from './plugins/floating-text-format-toolbar-plugin';
import LinkPlugin from './plugins/link-plugin';
import { useEnhanceLinks } from './plugins/link-plugin/bar-fix';
import MarkdownShortcutPlugin from './plugins/markdown-shortcuts';
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

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia('(max-width: 640px)').matches;

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
      <div className="border border-t-0 rounded-b-lg relative bg-background editor-text" ref={onRef}>
        <RichTextPlugin
          contentEditable={
            <div
              className="relative resize-y text-base [tab-size:1]"
              ref={onRef}
            >
              <ContentEditable
                className="relative min-h-36 outline-none outline-0 py-4 px-3 caret-secondary-foreground MainEditorTheme"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="absolute inline-block top-4 left-3 select-none pointer-events-none text-ellipsis">
                    {placeholder}
                  </div>
                }
              />
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ListPlugin />
        <CheckListPlugin />
        <ClearEditorPlugin onClear={() => toast.info(locale ? 'Успешно очищено' : 'Successfully cleared')} />
        <ClickableLinkPlugin disabled={isEditable} />
        <HistoryPlugin externalHistoryState={historyState} />
        <AutoFocusPlugin />
        <CodeHighlightPlugin />
        <HorizontalRulePlugin />
        <LexicalAutoLinkPlugin />
        <CollapsiblePlugin />
        {floatingAnchorElem && !isSmallWidthViewport && (
          <>
            <FloatingLinkEditorPlugin
              anchorElem={floatingAnchorElem ?? undefined}
              isLinkEditMode={isLinkEditMode}
              setIsLinkEditMode={setIsLinkEditMode}
            />
            <FloatingTextFormatToolbarPlugin
              anchorElem={floatingAnchorElem ?? undefined}
              setIsLinkEditMode={setIsLinkEditMode}
            />
            <DraggableBlockPlugin
              anchorElem={floatingAnchorElem ?? undefined}
            />
          </>
        )}
        <SelectionAlwaysOnDisplay />
        <LinkPlugin hasLinkAttributes />
        <MarkdownShortcutPlugin />
        <ShortcutsPlugin editor={editor} setIsLinkEditMode={setIsLinkEditMode} />
      </div>
    </>
  )
}
