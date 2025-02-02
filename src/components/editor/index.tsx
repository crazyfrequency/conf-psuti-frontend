'use client';

import { InitialConfigType, InitialEditorStateType, LexicalComposer } from '@lexical/react/LexicalComposer';

import { cn } from '@/lib/utils';
import { useI18n } from '@/locales/client';
import { $createParagraphNode, $getRoot, $isTextNode, DOMConversionMap, TextNode } from 'lexical';
import { toast } from 'sonner';
import { ToolbarContext } from './context/toolbar-context';
import EditorMain from './editor';
import './editor.css';
import AllNodes from './nodes/AllNodes';
import theme from './themes/MainEditorTheme';

function getExtraStyles(element: HTMLElement): string {
  // Parse styles from pasted input, but only if they match exactly the
  // sort of styles that would be produced by exportDOM
  let extraStyles = '';
  // const fontSize = parseAllowedFontSize(element.style.fontSize);
  // const backgroundColor = parseAllowedColor(element.style.backgroundColor);
  // const color = parseAllowedColor(element.style.color);
  // if (fontSize !== '' && fontSize !== '16px') {
  //   extraStyles += `font-size: ${fontSize};`;
  // }
  // if (backgroundColor !== '' && backgroundColor !== 'inherit') {
  //   extraStyles += `background-color: ${backgroundColor};`;
  // }
  // if (color !== '' && color !== 'inherit') {
  //   extraStyles += `color: ${color};`;
  // }
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

function $preloadDefault() {
  const root = $getRoot();
  if (root.getFirstChild() === null) {
    root.append($createParagraphNode());
  }
}

export default function Editor({
  namespace,
  editorState = null,
  placeholder,
  className,
  ...props
}: Readonly<React.HTMLAttributes<HTMLDivElement>> & Readonly<{
  namespace?: string
  editorState?: InitialEditorStateType
  placeholder?: string
}>) {
  const i18n = useI18n();

  const initialConfig: InitialConfigType = {
    namespace: namespace ?? "text_editor",
    editorState: editorState ?? $preloadDefault,
    html: {import: buildImportMap()},
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
          <EditorMain placeholder={placeholder ?? i18n('editor.placeholder')} />
        </ToolbarContext>
      </div>
    </LexicalComposer>
  )
}
