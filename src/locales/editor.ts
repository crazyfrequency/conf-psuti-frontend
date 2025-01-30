const header_ru = {
  hints: {
    undo: 'Отменить',
    redo: 'Повторить',
  }
} as const;

const header_en = {
  hints: {
    undo: 'Undo',
    redo: 'Redo',
  }
} as const;

export const editor_headers = {
  ru: header_ru,
  en: header_en,
}