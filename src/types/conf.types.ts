/**
 * Структура конференции
 */
export type TConf = {
  title_ru: string;
  type: string;
  status_ru?: string;
  slug: string;
  start: string|number;
  end?: string|number;
  paths: IPath[];
  url: string;
} & (
  {
    include_en?: true
    title_en: string
    status_en?: string
  } | {
    include_en?: false
  }
)

/**
 * Структура путей в конференции
 */
export interface IPath {
  title_ru: string;
  title_en?: string;
  url: string;
}