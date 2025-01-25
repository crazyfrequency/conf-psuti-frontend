import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import EditorToolbar from "./plugins/toolbar";


export default function EditorMain({
  placeholder
}: Readonly<{
  placeholder: string
}>) {
  return (
    <>
      <EditorToolbar />
      <div className="relative bg-background">
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
        <HistoryPlugin  />
        <AutoFocusPlugin />
      </div>
    </>
  )
}
