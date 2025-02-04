import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCurrentLocale } from "@/locales/client";
import { editor_headers } from "@/locales/editor";
import { ElementFormatType, FORMAT_ELEMENT_COMMAND, INDENT_CONTENT_COMMAND, LexicalEditor, OUTDENT_CONTENT_COMMAND } from "lexical";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, ChevronDown, Indent, Outdent } from "lucide-react";
import { useToolbarState } from "../../context/toolbar-context";
import { SHORTCUTS } from "../shortcuts-plugin/shortcuts";

function Icon({ format }: Readonly<{ format: ElementFormatType }>) {
  if (format === 'left' || format === 'start')
    return <AlignLeft />;

  if (format === 'center')
    return <AlignCenter />;

  if (format === 'right' || format === 'end')
    return <AlignRight />;

  if (format === 'justify')
    return <AlignJustify />;
}

export default function FormatPicker({
  editor,
  disabled = false,
}: Readonly<{
  editor: LexicalEditor;
  disabled: boolean;
}>) {
  const locale = useCurrentLocale();
  const aligns = editor_headers[locale].align;
  const { toolbarState: { isRTL, elementFormat }, updateToolbarState } = useToolbarState();

  const format = elementFormat || "left";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2" disabled={disabled}>
          <Icon format={format} />{" "}{aligns[format]}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={format === "left" ? "bg-accent/65" : ""}
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
              }}
            >
              <Icon format="left" />{" "}{aligns.left}
              <DropdownMenuShortcut>
                {SHORTCUTS.LEFT_ALIGN}
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={format === "center" ? "bg-accent/65" : ""}
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
              }}
            >
              <Icon format="center" />{" "}{aligns.center}
              <DropdownMenuShortcut>
                {SHORTCUTS.CENTER_ALIGN}
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={format === "right" ? "bg-accent/65" : ""}
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
              }}
            >
              <Icon format="right" />{" "}{aligns.right}
              <DropdownMenuShortcut>
                {SHORTCUTS.RIGHT_ALIGN}
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={format === "justify" ? "bg-accent/65" : ""}
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
              }}
            >
              <Icon format="justify" />{" "}{aligns.justify}
              <DropdownMenuShortcut>
                {SHORTCUTS.JUSTIFY_ALIGN}
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={format === "start" ? "bg-accent/65" : ""}
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'start');
              }}
            >
              <Icon format="start" />{" "}{aligns.start}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={format === "end" ? "bg-accent/65" : ""}
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'end');
              }}
            >
              <Icon format="end" />{" "}{aligns.end}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        <DropdownMenuItem
          onClick={() => {
            editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
          }}
        >
          <Outdent />{" "}{aligns.outdent}
          <DropdownMenuShortcut>
            {SHORTCUTS.OUTDENT}
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
          }}
        >
          <Indent />{" "}{aligns.indent}
          <DropdownMenuShortcut>
            {SHORTCUTS.INDENT}
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
