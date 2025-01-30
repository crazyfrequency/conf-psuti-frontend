'use client';

import { InitialConfigType, InitialEditorStateType, LexicalComposer } from '@lexical/react/LexicalComposer';

import { useI18n } from '@/locales/client';
import { toast } from 'sonner';
import { ToolbarContext } from './context/toolbar-context';
import EditorMain from './editor';
import './editor.css';
import AllNodes from './nodes/AllNodes';
import theme from './themes/MainEditorTheme';

export default function Editor({
  namespace,
  editorState = null,
  placeholder
}: Readonly<{
  namespace?: string
  editorState?: InitialEditorStateType
  placeholder?: string
}>) {
  const i18n = useI18n();

  const initialConfig: InitialConfigType = {
    namespace: namespace ?? "text_editor",
    editorState: editorState,
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
      <div className="relative max-w-full rounded-md">
        <ToolbarContext>
          <EditorMain placeholder={placeholder ?? i18n('editor.placeholder')} />
        </ToolbarContext>
      </div>
    </LexicalComposer>
  )
}
