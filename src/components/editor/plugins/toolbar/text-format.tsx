import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useCurrentLocale } from '@/locales/client';
import { editor_headers } from '@/locales/editor';
import { FORMAT_TEXT_COMMAND, LexicalEditor } from 'lexical';
import { ALargeSmall, CaseLower, CaseSensitive, CaseUpper, ChevronDown, RemoveFormatting, Strikethrough, Subscript, Superscript } from 'lucide-react';
import { useToolbarState } from '../../context/toolbar-context';
import { SHORTCUTS } from '../shortcuts-plugin/shortcuts';
import { clearFormatting } from './utils';

export default function TextFormat({
  disabled,
  activeEditor,
}: Readonly<{
  disabled: boolean;
  activeEditor: LexicalEditor;
}>) {
  const locale = useCurrentLocale();
  const { toolbarState: {
    isLowercase,
    isUppercase,
    isCapitalize,
    isStrikethrough,
    isSubscript,
    isSuperscript
  } } = useToolbarState();

  const titles = editor_headers[locale].text_formats;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2 gap-1" disabled={disabled}>
          <ALargeSmall /> <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className={cn(isLowercase && 'bg-accent/65')}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'lowercase');
          }}
        >
          <CaseLower /> {titles.lower}
          <DropdownMenuShortcut>{SHORTCUTS.LOWERCASE}</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(isUppercase && 'bg-accent/65')}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'uppercase');
          }}
        >
          <CaseUpper /> {titles.upper}
          <DropdownMenuShortcut>{SHORTCUTS.UPPERCASE}</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(isCapitalize && 'bg-accent/65')}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'capitalize');
          }}
        >
          <CaseSensitive /> {titles.capitalize}
          <DropdownMenuShortcut>{SHORTCUTS.CAPITALIZE}</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(isStrikethrough && 'bg-accent/65')}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
          }}
        >
          <Strikethrough /> {titles.strikethrough}
          <DropdownMenuShortcut>{SHORTCUTS.STRIKETHROUGH}</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(isSubscript && 'bg-accent/65')}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
          }}
        >
          <Subscript /> {titles.subscript}
          <DropdownMenuShortcut>{SHORTCUTS.SUBSCRIPT}</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(isSuperscript && 'bg-accent/65')}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
          }}
        >
          <Superscript /> {titles.superscript}
          <DropdownMenuShortcut>{SHORTCUTS.SUPERSCRIPT}</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => clearFormatting(activeEditor)}
        >
          <RemoveFormatting /> {titles.clear}
          <DropdownMenuShortcut>{SHORTCUTS.CLEAR_FORMATTING}</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
