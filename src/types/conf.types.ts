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
  closingDateForApplications?: string|number;
  paths: IPath[];
  url: string;
  statusEn?: string
} & (
  {
    isEnglishEnable?: true
    conferenceNameEn: string
  } | {
    isEnglishEnable?: false
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