import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useCurrentLocale } from '@/locales/client';
import { editor_headers } from '@/locales/editor';
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';
import { LexicalEditor } from 'lexical';
import { ChevronDown, ChevronRight, Image, Plus, Rows2 } from 'lucide-react';
import { useState } from 'react';
import { INSERT_COLLAPSIBLE_COMMAND } from '../collapsible-plugin';
import { InsertImageDialog } from '../images-plugin';

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
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
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
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setImageDialogOpen(true)}>
              <Image />{" "+insert.image}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{insert.image}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 pt-4">
            <InsertImageDialog activeEditor={activeEditor} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
