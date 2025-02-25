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
  pages: IPath[];
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
  pageNameRu: string;
  pageNameEn?: string;
  path: string;
}

export type TConfForm = Omit<TConf, 'pages'|'closingDateForApplications'> & {
  conferenceNameEn?: string;
}
