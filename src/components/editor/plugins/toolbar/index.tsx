import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCurrentLocale } from "@/locales/client";
import { editor_headers } from "@/locales/editor";
import { $isCodeNode, CODE_LANGUAGE_MAP } from "@lexical/code";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isListNode, ListNode } from "@lexical/list";
import { $isHeadingNode } from "@lexical/rich-text";
import { $getSelectionStyleValueForProperty, $isParentElementRTL, $patchStyleText } from "@lexical/selection";
import { $isTableNode, $isTableSelection } from "@lexical/table";
import { $findMatchingParent, $getNearestNodeOfType, $isEditorIsNestedEditor, mergeRegister } from "@lexical/utils";
import { $getSelection, $isElementNode, $isRangeSelection, $isRootOrShadowRoot, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, FORMAT_TEXT_COMMAND, LexicalEditor, NodeKey, REDO_COMMAND, SELECTION_CHANGE_COMMAND, UNDO_COMMAND } from "lexical";
import { Bold, Code, Italic, Link, Redo, Underline, Undo } from "lucide-react";
import { Dispatch, useCallback, useEffect, useState } from "react";
import { blockTypeToBlockName, useToolbarState } from "../../context/toolbar-context";
import { getSelectedNode } from "../../utils/getSelectedNode";
import { sanitizeUrl } from "../../utils/url";
import { SHORTCUTS } from "../shortcuts-plugin/shortcuts";
import BlockFormatDropdown from "./block-format";
import CodeLangPicker from "./code-lang-picker";
import ColorPickerDropdown from "./color-picker";
import FontPicker from "./font-picker";
import FontSize from "./font-size";
import FormatPicker from "./format-picker";
import InsertPicker from "./insert-picker";
import TextFormat from "./text-format";

export default function EditorToolbar({
  editor,
  activeEditor,
  setActiveEditor,
  setIsLinkEditMode,
}: Readonly<{
  editor: LexicalEditor;
  activeEditor: LexicalEditor;
  setActiveEditor: Dispatch<LexicalEditor>;
  setIsLinkEditMode: Dispatch<boolean>;
}>) {
  const locale = useCurrentLocale();
  const header_locale = editor_headers[locale];
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(
    null,
  );
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());
  const {toolbarState, updateToolbarState} = useToolbarState();

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      if (activeEditor !== editor && $isEditorIsNestedEditor(activeEditor)) {
        const rootElement = activeEditor.getRootElement();
        updateToolbarState(
          'isImageCaption',
          !!rootElement?.parentElement?.classList.contains(
            'image-caption-container',
          ),
        );
      } else {
        updateToolbarState('isImageCaption', false);
      }

      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      updateToolbarState('isRTL', $isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      const isLink = $isLinkNode(parent) || $isLinkNode(node);
      updateToolbarState('isLink', isLink);

      const tableNode = $findMatchingParent(node, $isTableNode);
      if ($isTableNode(tableNode)) {
        updateToolbarState('rootType', 'table');
      } else {
        updateToolbarState('rootType', 'root');
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode,
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();

          updateToolbarState('blockType', type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            updateToolbarState(
              'blockType',
              type as keyof typeof blockTypeToBlockName,
            );
          }
          if ($isCodeNode(element)) {
            const language =
              element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
            updateToolbarState(
              'codeLanguage',
              language ? CODE_LANGUAGE_MAP[language] || language : '',
            );
            return;
          }
        }
      }
      // Handle buttons
      updateToolbarState(
        'fontColor',
        $getSelectionStyleValueForProperty(selection, 'color', 'none'),
      );
      updateToolbarState(
        'bgColor',
        $getSelectionStyleValueForProperty(
          selection,
          'background-color',
          'none',
        ),
      );
      updateToolbarState(
        'fontFamily',
        $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial'),
      );
      let matchingParent;
      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline(),
        );
      }

      // If matchingParent is a valid node, pass it's format type
      updateToolbarState(
        'elementFormat',
        $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
          ? node.getFormatType()
          : parent?.getFormatType() || 'left',
      );
    }
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      // Update text format
      updateToolbarState('isBold', selection.hasFormat('bold'));
      updateToolbarState('isItalic', selection.hasFormat('italic'));
      updateToolbarState('isUnderline', selection.hasFormat('underline'));
      updateToolbarState(
        'isStrikethrough',
        selection.hasFormat('strikethrough'),
      );
      updateToolbarState('isSubscript', selection.hasFormat('subscript'));
      updateToolbarState('isSuperscript', selection.hasFormat('superscript'));
      updateToolbarState('isCode', selection.hasFormat('code'));
      updateToolbarState(
        'fontSize',
        $getSelectionStyleValueForProperty(selection, 'font-size', '16px'),
      );
      updateToolbarState('isLowercase', selection.hasFormat('lowercase'));
      updateToolbarState('isUppercase', selection.hasFormat('uppercase'));
      updateToolbarState('isCapitalize', selection.hasFormat('capitalize'));
    }
  }, [activeEditor, editor, updateToolbarState]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor);
        $updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, $updateToolbar, setActiveEditor]);

  useEffect(() => {
    activeEditor.getEditorState().read(() => {
      $updateToolbar();
    });
  }, [activeEditor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          updateToolbarState('canUndo', payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          updateToolbarState('canRedo', payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [$updateToolbar, activeEditor, editor, updateToolbarState]);

  const insertLink = useCallback(() => {
    if (!toolbarState.isLink) {
      setIsLinkEditMode(true);
      activeEditor.dispatchCommand(
        TOGGLE_LINK_COMMAND,
        sanitizeUrl('https://'),
      );
    } else {
      setIsLinkEditMode(false);
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [activeEditor, setIsLinkEditMode, toolbarState.isLink]);

  const applyStyleText = useCallback(
    (styles: Record<string, string>, skipHistoryStack?: boolean) => {
      activeEditor.update(
        () => {
          const selection = $getSelection();
          if (selection !== null) {
            $patchStyleText(selection, styles);
          }
        },
        skipHistoryStack ? {tag: 'historic'} : {},
      );
    },
    [activeEditor],
  );

  const onFontColorSelect = useCallback(
    (value: string, skipHistoryStack: boolean) => {
      applyStyleText({color: value}, skipHistoryStack);
    },
    [applyStyleText],
  );

  const onBgColorSelect = useCallback(
    (value: string, skipHistoryStack: boolean) => {
      applyStyleText({'background-color': value}, skipHistoryStack);
    },
    [applyStyleText],
  );

  const canViewerSeeInsertDropdown = !toolbarState.isImageCaption;
  const canViewerSeeInsertCodeButton = !toolbarState.isImageCaption;

  return (
    <div className="sticky flex h-[3.125rem] max-w-full gap-1 top-14 border bg-background rounded-t-lg p-1 align-middle border-solid z-10  overflow-x-auto overflow-y-hidden">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="min-w-10"
              size="icon"
              disabled={!toolbarState.canUndo || !isEditable}
              onClick={() => {
                activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
              }}
            >
              <Undo />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {header_locale.hints.undo}{` (${SHORTCUTS.UNDO})`}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="min-w-10"
              size="icon"
              disabled={!toolbarState.canRedo || !isEditable}
              onClick={() => {
                activeEditor.dispatchCommand(REDO_COMMAND, undefined);
              }}
            >
              <Redo />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {header_locale.hints.redo}{` (${SHORTCUTS.REDO})`}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Separator orientation="vertical" />
      {toolbarState.blockType in blockTypeToBlockName &&
      activeEditor === editor && (
        <BlockFormatDropdown
          activeEditor={activeEditor}
          editor={editor}
          disabled={!isEditable}
        />
      )}
      {toolbarState.blockType === 'code' ? (
        <CodeLangPicker
          activeEditor={activeEditor}
          disabled={!isEditable}
          selectedElementKey={selectedElementKey}
        />
      ) : (
        <>
          <FontPicker
            editor={editor}
            value={toolbarState.fontFamily}
            disabled={!isEditable}
          />
          <Separator orientation="vertical" />
          <FontSize
            editor={editor}
            selectionFontSize={toolbarState.fontSize.slice(0, -2)}
            disabled={!isEditable}
          />
          <Separator orientation="vertical" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  disabled={!isEditable}
                  data-state={toolbarState.isBold ? 'on' : 'off'}
                  pressed={toolbarState.isBold}
                  onClick={() => {
                    activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
                  }}
                >
                  <Bold />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>
                {header_locale.hints.bold}{` (${SHORTCUTS.BOLD})`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  disabled={!isEditable}
                  data-state={toolbarState.isItalic ? 'on' : 'off'}
                  pressed={toolbarState.isItalic}
                  onClick={() => {
                    activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
                  }}
                >
                  <Italic />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>
                {header_locale.hints.italic}{` (${SHORTCUTS.ITALIC})`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  disabled={!isEditable}
                  data-state={toolbarState.isUnderline ? 'on' : 'off'}
                  pressed={toolbarState.isUnderline}
                  onClick={() => {
                    activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
                  }}
                >
                  <Underline />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>
                {header_locale.hints.underline}{` (${SHORTCUTS.UNDERLINE})`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {canViewerSeeInsertCodeButton && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Toggle
                    disabled={!isEditable}
                    data-state={toolbarState.isCode ? 'on' : 'off'}
                    pressed={toolbarState.isCode}
                    onClick={() => {
                      activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
                    }}
                  >
                    <Code />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent>
                  {header_locale.hints.code_block}{` (${SHORTCUTS.INSERT_CODE_BLOCK})`}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  disabled={!isEditable}
                  data-state={toolbarState.isLink ? 'on' : 'off'}
                  pressed={toolbarState.isLink}
                  onClick={insertLink}
                >
                  <Link />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>
                {header_locale.hints.link}{` (${SHORTCUTS.INSERT_LINK})`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ColorPickerDropdown
            disabled={!isEditable}
            type="font"
            color={toolbarState.fontColor}
            onChange={onFontColorSelect}
          />
          <ColorPickerDropdown
            disabled={!isEditable}
            type="background"
            color={toolbarState.bgColor}
            onChange={onBgColorSelect}
          />
          <TextFormat
            disabled={!isEditable}
            activeEditor={activeEditor}
          />
        </>
      )}
      <Separator orientation="vertical" />
      <FormatPicker
        editor={activeEditor}
        disabled={!isEditable}
      />
      {
        toolbarState.blockType !== 'code' &&
        canViewerSeeInsertDropdown && (
          <InsertPicker
            editor={editor}
            activeEditor={activeEditor}
            disabled={!isEditable}
          />
        )
      }
    </div>
  )
}
