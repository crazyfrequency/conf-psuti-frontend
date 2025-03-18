import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useCurrentLocale } from '@/locales/client';
import { editor_headers } from '@/locales/editor';
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';
import { LexicalEditor } from 'lexical';
import { ChevronDown, ChevronRight, Plus, Rows2 } from 'lucide-react';
import { INSERT_COLLAPSIBLE_COMMAND } from '../collapsible-plugin';

export default function InsertPicker({
  editor,
  activeEditor,
  disabled,
}: Readonly<{
  editor: LexicalEditor;
  activeEditor: LexicalEditor;
  disabled?: boolean;
}>) {
  const locale = useCurrentLocale();
  const insert = editor_headers[locale].insert;
  return (
    <>
      <Separator orientation="vertical" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-2" disabled={disabled}>
            <Plus />{" "+insert.default}<ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                activeEditor.dispatchCommand(
                  INSERT_HORIZONTAL_RULE_COMMAND,
                  undefined,
                );
              }}
            >
              <Rows2 />{insert.horizontal}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                editor.dispatchCommand(
                  INSERT_COLLAPSIBLE_COMMAND,
                  undefined,
                );
              }}
            >
              <ChevronRight />{" "+insert.collapsible}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
