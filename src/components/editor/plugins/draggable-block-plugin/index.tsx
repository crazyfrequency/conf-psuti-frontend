/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { cn } from '@/lib/utils';
import { DraggableBlockPlugin_EXPERIMENTAL } from '@lexical/react/LexicalDraggableBlockPlugin';
import { GripVertical } from 'lucide-react';
import { JSX, useRef } from 'react';

const DRAGGABLE_BLOCK_MENU_CLASSNAME = 'draggable-block-menu';

function isOnMenu(element: HTMLElement): boolean {
  return !!element.closest(`.${DRAGGABLE_BLOCK_MENU_CLASSNAME}`);
}

export default function DraggableBlockPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement;
}): JSX.Element {
  const menuRef = useRef<HTMLDivElement>(null);
  const targetLineRef = useRef<HTMLDivElement>(null);

  return (
    <DraggableBlockPlugin_EXPERIMENTAL
      anchorElem={anchorElem}
      menuRef={menuRef as React.RefObject<HTMLDivElement>}
      targetLineRef={targetLineRef as React.RefObject<HTMLDivElement>}
      menuComponent={
        <div
          ref={menuRef}
          className={cn(
            "absolute opacity-0 cursor-grab p-0.5 py-1",
            "border border-border rounded-sm top-0 -left-4",
            "bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/25",
            "will-change-transform"
          )}
        >
          <GripVertical className="size-4" />
        </div>
      }
      targetLineComponent={
        <div ref={targetLineRef} className="absolute h-1 top-0 left-0 opacity-0 will-change-transform pointer-events-none bg-primary" />
      }
      isOnMenu={isOnMenu}
    />
  );
}
