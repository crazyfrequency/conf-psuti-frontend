/**
 * Структура конференции
 */
export type TConf = {
  conferenceNameRu: string;
  type: string;
  statusRu?: string;
  slug: string;
  startDate: string|number;
  endDate?: string|number;
  paths: IPath[];
  url: string;
} & (
  {
    includeEn?: true
    conferenceNameEn: string
    statusEn?: string
  } | {
    includeEn?: false
  }
)

/**
 * Структура путей в конференции
 */
export interface IPath {
  titleRu: string;
  titleEn?: string;
  url: string;
}