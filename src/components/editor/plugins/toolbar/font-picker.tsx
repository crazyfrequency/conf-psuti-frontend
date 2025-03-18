import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { $patchStyleText } from '@lexical/selection';
import { $getSelection, LexicalEditor } from 'lexical';
import { ChevronDown, Type } from 'lucide-react';
import { useCallback } from 'react';

const FONT_FAMILY_OPTIONS: [string, string][] = [
  ['Arial', 'Arial'],
  ['Courier New', 'Courier New'],
  ['Georgia', 'Georgia'],
  ['Times New Roman', 'Times New Roman'],
  ['Trebuchet MS', 'Trebuchet MS'],
  ['Verdana', 'Verdana'],
];

export default function FontPicker({
  editor,
  value,
  disabled = false
}: Readonly<{
  editor: LexicalEditor;
  value: string;
  disabled?: boolean;
}>) {
  const handleClick = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if (selection !== null) {
          $patchStyleText(selection, {
            'font-family': option,
          });
        }
      });
    },
    [editor],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2" disabled={disabled} style={{ fontFamily: value }}>
          <Type />{" "}{value}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {FONT_FAMILY_OPTIONS.map(
            ([option, text]) => (
              <DropdownMenuItem
                className={option === value ? 'bg-accent/65' : ''}
                style={{ fontFamily: option }}
                onClick={() => handleClick(option)}
                key={option}
              >
                {text}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
