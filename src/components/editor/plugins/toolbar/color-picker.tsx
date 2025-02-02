import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ColorPicker from "@/components/ui/editor/color-picker";
import { Baseline, ChevronDown, PaintBucket } from "lucide-react";

export default function ColorPickerDropdown({
  disabled,
  type,
  color,
  onChange
}: Readonly<{
  disabled?: boolean;
  type: "font" | "background";
  color: string;
  onChange?: (color: string, skipHistoryStack: boolean) => void;
}>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2 gap-1" disabled={disabled}>
          {
            type === "font" ? (
              <>
                <Baseline /> <ChevronDown />
              </>
            ) : (
              <>
                <PaintBucket /> <ChevronDown />
              </>
            )
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <ColorPicker color={color} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
