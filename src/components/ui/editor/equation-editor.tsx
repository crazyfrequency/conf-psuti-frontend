/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { JSX, Ref, RefObject } from 'react';

import { isHTMLElement } from 'lexical';
import { ChangeEvent, forwardRef } from 'react';

type BaseEquationEditorProps = {
  equation: string;
  inline: boolean;
  setEquation: (equation: string) => void;
};

function EquationEditor(
  {equation, setEquation, inline}: BaseEquationEditorProps,
  forwardedRef: Ref<HTMLInputElement | HTMLTextAreaElement>,
): JSX.Element {
  const onChange = (event: ChangeEvent) => {
    setEquation((event.target as HTMLInputElement).value);
  };

  return inline && isHTMLElement(forwardedRef) ? (
    <span className="bg-background">
      <span className="text-left text-foreground">$</span>
      <input
        className="m-0 p-0 border-0 outline-0 text-pink-700 bg-inherit resize-none"
        value={equation}
        onChange={onChange}
        autoFocus={true}
        ref={forwardedRef as RefObject<HTMLInputElement>}
      />
      <span className="text-left text-foreground">$</span>
    </span>
  ) : (
    <div className="bg-background">
      <span className="text-left text-foreground">{'$$\n'}</span>
      <textarea
        className="m-0 p-0 border-0 outline-0 text-pink-700 bg-inherit resize-none w-full"
        value={equation}
        onChange={onChange}
        ref={forwardedRef as RefObject<HTMLTextAreaElement>}
      />
      <span className="text-left text-foreground">{'\n$$'}</span>
    </div>
  );
}

export default forwardRef(EquationEditor);
