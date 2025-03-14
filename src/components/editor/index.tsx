'use client';

import { InitialConfigType, InitialEditorStateType, LexicalComposer } from '@lexical/react/LexicalComposer';

import { cn } from '@/lib/utils';
import { useI18n } from '@/locales/client';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { $generateNodesFromDOM } from '@lexical/html';
import { ListItemNode } from '@lexical/list';
import { $createParagraphNode, $getRoot, $insertNodes, $isTextNode, DOMConversionMap, DOMExportOutput, DOMExportOutputMap, Klass, LexicalEditor, LexicalNode, LineBreakNode, TextNode } from 'lexical';
import { toast } from 'sonner';
import { parseAllowedColor } from '../ui/editor/color-picker';
import { ToolbarContext } from './context/toolbar-context';
import EditorMain from './editor';
import './editor.css';
import AllNodes from './nodes/AllNodes';
import { parseAllowedFontSize } from './plugins/toolbar/font-size';
import theme from './themes/MainEditorTheme';

function getExtraStyles(element: HTMLElement): string {
  // Parse styles from pasted input, but only if they match exactly the
  // sort of styles that would be produced by exportDOM
  let extraStyles = '';
  const fontSize = parseAllowedFontSize(element.style.fontSize);
  const backgroundColor = parseAllowedColor(element.style.backgroundColor);
  const color = parseAllowedColor(element.style.color);
  if (fontSize !== '' && fontSize !== '16px') {
    extraStyles += `font-size: ${fontSize};`;
  }
  if (backgroundColor !== '' && backgroundColor !== 'inherit') {
    extraStyles += `background-color: ${backgroundColor};`;
  }
  if (color !== '' && color !== 'inherit') {
    extraStyles += `color: ${color};`;
  }
  return extraStyles;
}

function buildImportMap(): DOMConversionMap {
  const importMap: DOMConversionMap = {};

  // Wrap all TextNode importers with a function that also imports
  // the custom styles implemented by the playground
  for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
    importMap[tag] = (importNode) => {
      const importer = fn(importNode);
      if (!importer) {
        return null;
      }
      return {
        ...importer,
        conversion: (element) => {
          const output = importer.conversion(element);
          if (
            output === null ||
            output.forChild === undefined ||
            output.after !== undefined ||
            output.node !== null
          ) {
            return output;
          }
          const extraStyles = getExtraStyles(element);
          if (extraStyles) {
            const {forChild} = output;
            return {
              ...output,
              forChild: (child, parent) => {
                const textNode = forChild(child, parent);
                if ($isTextNode(textNode)) {
                  textNode.setStyle(textNode.getStyle() + extraStyles);
                }
                return textNode;
              },
            };
          }
          return output;
        },
      };
    };
  }

  return importMap;
}

function buildExportMap(): DOMExportOutputMap {
  return new Map<Klass<LexicalNode>, (editor: LexicalEditor, node: LexicalNode) => DOMExportOutput>([
    [
      CodeNode,
      (editor: LexicalEditor, node: LexicalNode) => {
        const codeNode = node as CodeNode;

        const count = codeNode.getChildren().filter(v => v.getType() === LineBreakNode.getType()).length

        let { element, after } = codeNode.exportDOM(editor);

        if (element instanceof HTMLElement) {
          element.setAttribute("data-gutter", Array.from({ length: count+1 }).map((_, i) => i + 1).join("\n"));
        }

        return {
          element,
          after: (element) => {
            element?.appendChild(document.createElement("br"));
            return after?.(element);
          }
        };
      },
    ],
    [
      CodeHighlightNode,
      (editor: LexicalEditor, node: LexicalNode) => {
        const codeHighlightNode = node as CodeHighlightNode;
        const { element, after } = codeHighlightNode.exportDOM(editor);

        if (element instanceof HTMLElement) {
          element.removeAttribute("style");
        }

        return { element, after };
      },
    ],
    [
      ListItemNode,
      (editor: LexicalEditor, node: LexicalNode) => {
        const listItemNode = node as ListItemNode;
        const { element, after } = listItemNode.exportDOM(editor);

        if (element instanceof HTMLElement) {
          if (listItemNode.getChildrenSize() === 0) {
            element.appendChild(document.createElement("br"));
          }
        }

        return { element, after };
      },
    ]
  ])
}

function $preloadDefault() {
  const root = $getRoot();
  if (root.getFirstChild() === null) {
    root.append($createParagraphNode());
  }
}

function convertDocumentToEditorState(document: Document): (editor: LexicalEditor) => void {
  return (editor) => {
    const nodes = $generateNodesFromDOM(editor, document);
    $getRoot().select();
    $insertNodes(nodes);
  }
}

export default function Editor({
  namespace,
  editorState = null,
  placeholder,
  className,
  onChange,
  ...props
}: Readonly<Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">> & Readonly<{
  onChange?: (text: string) => void
  namespace?: string
  editorState?: InitialEditorStateType | Document
  placeholder?: string
}>) {
  const i18n = useI18n();

  if (editorState instanceof Document) {
    editorState = convertDocumentToEditorState(editorState);
  }

  const initialConfig: InitialConfigType = {
    namespace: namespace ?? "text_editor",
    editorState: editorState ?? $preloadDefault,
    html: {import: buildImportMap(), export: buildExportMap()},
    theme: theme,
    nodes: AllNodes,
    onError: (error) => {
      toast.error(i18n('errors.editor', { error: error.name }), {
        description: error.message
      });
    }
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className={cn(
          "relative max-w-full rounded-md",
          className
        )}
        {...props}
      >
        <ToolbarContext>
          <EditorMain
            placeholder={placeholder ?? i18n('editor.placeholder')}
            onChange={onChange}
          />
        </ToolbarContext>
      </div>
    </LexicalComposer>
  )
}
