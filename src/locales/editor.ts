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
  }
} as const;

export const editor_headers = {
  ru: header_ru,
  en: header_en,
}