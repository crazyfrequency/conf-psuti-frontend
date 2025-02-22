/**
 * Структура конференции
 */
export type TConf = {
  conferenceNameRu: string;
  statusRu?: string;
  slug: string;
  startDate: string|number;
  endDate: string|number;
  closingDateForApplications?: string|number;
  paths: IPath[];
  statusEn?: string
} & (
  {
    isEnglishEnabled?: true
    conferenceNameEn: string
  } | {
    isEnglishEnabled?: false
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

export type TConfForm = Omit<TConf, 'paths'|'closingDateForApplications'> & {
  conferenceNameEn?: string;
}
