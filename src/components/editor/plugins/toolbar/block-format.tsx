import { Button } from '@/components/ui/button';
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useCurrentLocale } from '@/locales/client';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { LexicalEditor } from 'lexical';
import { Code, Heading1, Heading2, Heading3, LetterText, List, ListOrdered, ListTodo, MessageSquareQuote } from 'lucide-react';
import { blockTypeToBlockName, blockTypeToBlockNameRu, useToolbarState } from '../../context/toolbar-context';
import { SHORTCUTS } from '../shortcuts-plugin/shortcuts';
import { formatBulletList, formatCheckList, formatCode, formatHeading, formatNumberedList, formatParagraph, formatQuote } from './utils';

function BlockIcon({
  blockType
}: Readonly<{
  blockType: keyof typeof blockTypeToBlockName;
}>) {
  if (blockType === 'bullet')
    return <List />

  if (blockType === 'check')
    return <ListTodo />

  if (blockType === 'number')
    return <ListOrdered />

  if (blockType === 'quote')
    return <MessageSquareQuote />

  if (blockType === 'code')
    return <Code />

  if (blockType === 'h3')
    return <Heading1 />

  if (blockType === 'h4')
    return <Heading2 />

  if (blockType === 'h5')
    return <Heading3 />

  if (blockType === 'paragraph')
    return <LetterText />

  return null
}

export default function BlockFormatDropdown({
  activeEditor,
  editor,
  disabled = false
}: Readonly<{
  activeEditor: LexicalEditor;
  editor: LexicalEditor;
  disabled?: boolean;
}>) {
  const { toolbarState: { blockType } } = useToolbarState();
  const locale = useCurrentLocale();
  
  if (!(blockType in blockTypeToBlockName) || activeEditor !== editor)
    return null;
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" disabled={disabled}>
            <BlockIcon blockType={blockType} /> {
              locale === 'ru'
                ? blockTypeToBlockNameRu[blockType]
                : blockTypeToBlockName[blockType]
            }
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={blockType === 'paragraph' ? 'bg-accent/65' : ''}
              onClick={() => formatParagraph(editor)}
            >
              <BlockIcon blockType="paragraph" /> {
                locale === 'ru'
                  ? blockTypeToBlockNameRu.paragraph
                  : blockTypeToBlockName.paragraph
              }
              <DropdownMenuShortcut>{SHORTCUTS.NORMAL}</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={blockType === 'h3' ? 'bg-accent/65' : ''}
              onClick={() => formatHeading(editor, blockType, 'h3')}
            >
              <BlockIcon blockType="h3" /> {
                locale === 'ru'
                  ? blockTypeToBlockNameRu.h3
                  : blockTypeToBlockName.h3
              }
              <DropdownMenuShortcut>{SHORTCUTS.HEADING3}</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={blockType === 'h4' ? 'bg-accent/65' : ''}
              onClick={() => formatHeading(editor, blockType, 'h4')}
            >
              <BlockIcon blockType="h4" /> {
                locale === 'ru'
                  ? blockTypeToBlockNameRu.h4
                  : blockTypeToBlockName.h4
              }
              <DropdownMenuShortcut>{SHORTCUTS.HEADING4}</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={blockType === 'h5' ? 'bg-accent/65' : ''}
              onClick={() => formatHeading(editor, blockType, 'h5')}
            >
              <BlockIcon blockType="h5" /> {
                locale === 'ru'
                  ? blockTypeToBlockNameRu.h5
                  : blockTypeToBlockName.h5
              }
              <DropdownMenuShortcut>{SHORTCUTS.HEADING5}</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={blockType === 'bullet' ? 'bg-accent/65' : ''}
              onClick={() => formatBulletList(editor, blockType)}
            >
              <BlockIcon blockType="bullet" /> {
                locale === 'ru'
                  ? blockTypeToBlockNameRu.bullet
                  : blockTypeToBlockName.bullet
              }
              <DropdownMenuShortcut>{SHORTCUTS.BULLET_LIST}</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={blockType === 'number' ? 'bg-accent/65' : ''}
              onClick={() => formatNumberedList(editor, blockType)}
            >
              <BlockIcon blockType="number" /> {
                locale === 'ru'
                  ? blockTypeToBlockNameRu.number
                  : blockTypeToBlockName.number
              }
              <DropdownMenuShortcut>{SHORTCUTS.NUMBERED_LIST}</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={blockType === 'check' ? 'bg-accent/65' : ''}
              onClick={() => formatCheckList(editor, blockType)}
            >
              <BlockIcon blockType="check" /> {
                locale === 'ru'
                  ? blockTypeToBlockNameRu.check
                  : blockTypeToBlockName.check
              }
              <DropdownMenuShortcut>{SHORTCUTS.CHECK_LIST}</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={blockType === 'quote' ? 'bg-accent/65' : ''}
              onClick={() => formatQuote(editor, blockType)}
            >
              <BlockIcon blockType="quote" /> {
                locale === 'ru'
                  ? blockTypeToBlockNameRu.quote
                  : blockTypeToBlockName.quote
              }
              <DropdownMenuShortcut>{SHORTCUTS.QUOTE}</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={blockType === 'code' ? 'bg-accent/65' : ''}
              onClick={() => formatCode(editor, blockType)}
            >
              <BlockIcon blockType="code" /> {
                locale === 'ru'
                  ? blockTypeToBlockNameRu.code
                  : blockTypeToBlockName.code
              }
              <DropdownMenuShortcut>{SHORTCUTS.CODE_BLOCK}</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator className="mx-2" orientation="vertical" />
    </>
  )
}
