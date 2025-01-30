/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { EditorThemeClasses } from 'lexical';

import './MainEditorTheme.css';

const theme: EditorThemeClasses = {
  blockCursor: 'MainEditorTheme__blockCursor',
  characterLimit: 'MainEditorTheme__characterLimit',
  code: 'MainEditorTheme__code',
  codeHighlight: {
    atrule: 'MainEditorTheme__tokenAttr',
    attr: 'MainEditorTheme__tokenAttr',
    boolean: 'MainEditorTheme__tokenProperty',
    builtin: 'MainEditorTheme__tokenSelector',
    cdata: 'MainEditorTheme__tokenComment',
    char: 'MainEditorTheme__tokenSelector',
    class: 'MainEditorTheme__tokenFunction',
    'class-name': 'MainEditorTheme__tokenFunction',
    comment: 'MainEditorTheme__tokenComment',
    constant: 'MainEditorTheme__tokenProperty',
    deleted: 'MainEditorTheme__tokenProperty',
    doctype: 'MainEditorTheme__tokenComment',
    entity: 'MainEditorTheme__tokenOperator',
    function: 'MainEditorTheme__tokenFunction',
    important: 'MainEditorTheme__tokenVariable',
    inserted: 'MainEditorTheme__tokenSelector',
    keyword: 'MainEditorTheme__tokenAttr',
    namespace: 'MainEditorTheme__tokenVariable',
    number: 'MainEditorTheme__tokenProperty',
    operator: 'MainEditorTheme__tokenOperator',
    prolog: 'MainEditorTheme__tokenComment',
    property: 'MainEditorTheme__tokenProperty',
    punctuation: 'MainEditorTheme__tokenPunctuation',
    regex: 'MainEditorTheme__tokenVariable',
    selector: 'MainEditorTheme__tokenSelector',
    string: 'MainEditorTheme__tokenSelector',
    symbol: 'MainEditorTheme__tokenProperty',
    tag: 'MainEditorTheme__tokenProperty',
    url: 'MainEditorTheme__tokenOperator',
    variable: 'MainEditorTheme__tokenVariable',
  },
  embedBlock: {
    base: 'MainEditorTheme__embedBlock',
    focus: 'MainEditorTheme__embedBlockFocus',
  },
  hashtag: 'MainEditorTheme__hashtag',
  heading: {
    h3: 'MainEditorTheme__h3',
    h4: 'MainEditorTheme__h4',
    h5: 'MainEditorTheme__h5',
  },
  hr: 'MainEditorTheme__hr',
  image: 'editor-image',
  indent: 'MainEditorTheme__indent',
  inlineImage: 'inline-editor-image',
  layoutContainer: 'MainEditorTheme__layoutContainer',
  layoutItem: 'MainEditorTheme__layoutItem',
  link: 'MainEditorTheme__link',
  list: {
    checklist: 'MainEditorTheme__checklist',
    listitem: 'MainEditorTheme__listItem',
    listitemChecked: 'MainEditorTheme__listItemChecked',
    listitemUnchecked: 'MainEditorTheme__listItemUnchecked',
    nested: {
      listitem: 'MainEditorTheme__nestedListItem',
    },
    olDepth: [
      'MainEditorTheme__ol1',
      'MainEditorTheme__ol2',
      'MainEditorTheme__ol3',
      'MainEditorTheme__ol4',
      'MainEditorTheme__ol5',
    ],
    ul: 'MainEditorTheme__ul',
  },
  ltr: 'MainEditorTheme__ltr',
  mark: 'MainEditorTheme__mark',
  markOverlap: 'MainEditorTheme__markOverlap',
  paragraph: 'MainEditorTheme__paragraph',
  quote: 'MainEditorTheme__quote',
  rtl: 'MainEditorTheme__rtl',
  specialText: 'MainEditorTheme__specialText',
  tab: 'MainEditorTheme__tabNode',
  table: 'MainEditorTheme__table',
  tableAlignment: {
    center: 'MainEditorTheme__tableAlignmentCenter',
    right: 'MainEditorTheme__tableAlignmentRight',
  },
  tableCell: 'MainEditorTheme__tableCell',
  tableCellActionButton: 'MainEditorTheme__tableCellActionButton',
  tableCellActionButtonContainer:
    'MainEditorTheme__tableCellActionButtonContainer',
  tableCellHeader: 'MainEditorTheme__tableCellHeader',
  tableCellResizer: 'MainEditorTheme__tableCellResizer',
  tableCellSelected: 'MainEditorTheme__tableCellSelected',
  tableRowStriping: 'MainEditorTheme__tableRowStriping',
  tableScrollableWrapper: 'MainEditorTheme__tableScrollableWrapper',
  tableSelected: 'MainEditorTheme__tableSelected',
  tableSelection: 'MainEditorTheme__tableSelection',
  text: {
    bold: 'MainEditorTheme__textBold',
    capitalize: 'MainEditorTheme__textCapitalize',
    code: 'MainEditorTheme__textCode',
    italic: 'MainEditorTheme__textItalic',
    lowercase: 'MainEditorTheme__textLowercase',
    strikethrough: 'MainEditorTheme__textStrikethrough',
    subscript: 'MainEditorTheme__textSubscript',
    superscript: 'MainEditorTheme__textSuperscript',
    underline: 'MainEditorTheme__textUnderline',
    underlineStrikethrough: 'MainEditorTheme__textUnderlineStrikethrough',
    uppercase: 'MainEditorTheme__textUppercase',
  },
};

export default theme;
