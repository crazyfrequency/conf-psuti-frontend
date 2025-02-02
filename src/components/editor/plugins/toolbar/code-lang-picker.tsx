import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useCurrentLocale } from '@/locales/client';
import { $isCodeNode, CODE_LANGUAGE_FRIENDLY_NAME_MAP, getLanguageFriendlyName } from '@lexical/code';
import { $getNodeByKey, LexicalEditor, NodeKey } from 'lexical';
import { ChevronDown } from 'lucide-react';
import { useCallback } from 'react';
import { useToolbarState } from '../../context/toolbar-context';

function getCodeLanguageOptions(): [string, string][] {
  const options: [string, string][] = [];

  for (const [lang, friendlyName] of Object.entries(
    CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  )) {
    options.push([lang, friendlyName]);
  }

  return options;
}

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

export default function CodeLangPicker({
  disabled,
  activeEditor,
  selectedElementKey
}: Readonly<{
  disabled: boolean;
  activeEditor: LexicalEditor;
  selectedElementKey: NodeKey | null;
}>) {
  const { toolbarState: { codeLanguage } } = useToolbarState();
  const locale = useCurrentLocale();
  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(value);
          }
        }
      });
    },
    [activeEditor, selectedElementKey],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" disabled={disabled}>
          {codeLanguage ? getLanguageFriendlyName(codeLanguage) : (locale === 'ru' ? 'Выбрать язык' : 'Select language')}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {CODE_LANGUAGE_OPTIONS.map(([value, name]) => (
            <DropdownMenuItem
              key={value}
              className={value === codeLanguage ? 'bg-accent/65' : ''}
              onClick={() => onCodeLanguageSelect(value)}
            >
              {name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
