import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useCurrentLocale } from '@/locales/client';
import { editor_headers } from '@/locales/editor';
import { LexicalEditor } from 'lexical';
import { Minus, Plus } from 'lucide-react';
import React, { useEffect } from 'react';
import { MAX_ALLOWED_FONT_SIZE, MIN_ALLOWED_FONT_SIZE } from '../../context/toolbar-context';
import { SHORTCUTS } from '../shortcuts-plugin/shortcuts';
import { updateFontSize, updateFontSizeInSelection, UpdateFontSizeType } from './utils';

export function parseAllowedFontSize(input: string): string {
  const match = input.match(/^(\d+(?:\.\d+)?)px$/);
  if (match) {
    const n = Number(match[1]);
    if (n >= MIN_ALLOWED_FONT_SIZE && n <= MAX_ALLOWED_FONT_SIZE) {
      return input;
    }
  }
  return '';
}

export default function FontSize({
  selectionFontSize,
  disabled,
  editor
}: Readonly<{
  selectionFontSize: string;
  disabled: boolean;
  editor: LexicalEditor;
}>) {
  const [inputValue, setInputValue] = React.useState<string>(selectionFontSize);
  const [inputChangeFlag, setInputChangeFlag] = React.useState<boolean>(false);
  const locale = useCurrentLocale();

  const hint = editor_headers[locale].hints.font_size;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValueNumber = Number(inputValue);

    if (e.key === 'Tab') {
      return;
    }
    if (['e', 'E', '+', '-'].includes(e.key) || isNaN(inputValueNumber)) {
      e.preventDefault();
      setInputValue('');
      return;
    }
    setInputChangeFlag(true);
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault();

      updateFontSizeByInputValue(inputValueNumber);
    }
  };

  const handleInputBlur = () => {
    if (inputValue !== '' && inputChangeFlag) {
      const inputValueNumber = Number(inputValue);
      updateFontSizeByInputValue(inputValueNumber);
    }
  };

  const updateFontSizeByInputValue = (inputValueNumber: number) => {
    let updatedFontSize = inputValueNumber;
    if (inputValueNumber > MAX_ALLOWED_FONT_SIZE) {
      updatedFontSize = MAX_ALLOWED_FONT_SIZE;
    } else if (inputValueNumber < MIN_ALLOWED_FONT_SIZE) {
      updatedFontSize = MIN_ALLOWED_FONT_SIZE;
    }

    setInputValue(String(updatedFontSize));
    updateFontSizeInSelection(editor, String(updatedFontSize) + 'px', null);
    setInputChangeFlag(false);
  };

  useEffect(() => {
    setInputValue(selectionFontSize);
  }, [selectionFontSize]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={
                disabled || (
                  selectionFontSize !== '' &&
                  Number(inputValue) <= MIN_ALLOWED_FONT_SIZE
                )
              }
              size="icon"
              variant="ghost"
              onClick={() =>
                updateFontSize(editor, UpdateFontSizeType.decrement, inputValue)
              }
            >
              <Minus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {`${hint.decrease} (${SHORTCUTS.DECREASE_FONT_SIZE})`}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Input
              type="number"
              disabled={disabled}
              className="[appearance:textfield] max-w-11 text-center"
              value={inputValue}
              min={MIN_ALLOWED_FONT_SIZE}
              max={MAX_ALLOWED_FONT_SIZE}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleInputBlur}
            />
          </TooltipTrigger>
          <TooltipContent>
            {hint.default}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={
                disabled || (
                  selectionFontSize !== '' &&
                  Number(inputValue) >= MAX_ALLOWED_FONT_SIZE
                )
              }
              size="icon"
              variant="ghost"
              onClick={() =>
                updateFontSize(editor, UpdateFontSizeType.increment, inputValue)
              }
            >
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {`${hint.increase} (${SHORTCUTS.INCREASE_FONT_SIZE})`}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
