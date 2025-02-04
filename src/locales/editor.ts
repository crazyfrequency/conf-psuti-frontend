const header_ru = {
  hints: {
    undo: 'Отменить',
    redo: 'Повторить',
    bold: 'Жирный',
    italic: 'Курсив',
    underline: 'Подчеркнутый',
    code_block: 'Вставить блок кода',
    link: 'Вставить ссылку',
    font_size: {
      default: 'Размер шрифта',
      decrease: 'Уменьшить размер шрифта',
      increase: 'Увеличить размер шрифта',
    }
  },
  text_formats: {
    lower: 'Нижний регистр',
    upper: 'Верхний регистр',
    capitalize: 'С заглавной буквы',
    strikethrough: 'Зачеркнутый',
    subscript: 'Нижний индекс',
    superscript: 'Верхний индекс',
    clear: 'Очистить форматирование'
  },
  align: {
    left: 'По левому краю',
    center: 'По центру',
    right: 'По правому краю',
    justify: 'По ширине',
    start: 'К началу строки',
    end: 'К концу строки',
    outdent: 'Уменьшить отступ',
    indent: 'Увеличить отступ'
  }
} as const;

const header_en = {
  hints: {
    undo: 'Undo',
    redo: 'Redo',
    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
    code_block: 'Insert code block',
    link: 'Insert link',
    font_size: {
      default: 'Font size',
      decrease: 'Decrease font size',
      increase: 'Increase font size',
    }
  },
  text_formats: {
    lower: 'Lowercase',
    upper: 'Uppercase',
    capitalize: 'Capitalize',
    strikethrough: 'Strikethrough',
    subscript: 'Subscript',
    superscript: 'Superscript',
    clear: 'Clear formatting',
  },
  align: {
    left: 'Left Align',
    center: 'Center Align',
    right: 'Right Align',
    justify: 'Justify',
    start: 'Start Align',
    end: 'End Align',
    outdent: 'Outdent',
    indent: 'Indent'
  }
} as const;

export const editor_headers = {
  ru: header_ru,
  en: header_en,
}