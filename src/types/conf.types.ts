/**
 * Структура секций конференции
 */
export interface ISection {
  id: number;
  sectionNameRu: string;
  sectionNameEn?: string;
}

/**
 * Структура организаторов конференции
 */
export interface IOrganizer {
  id: number;
  organizerNameRu: string;
  organizerNameEn?: string;
  website?: string;
  email?: string;
  phone?: string;
}

/**
 * Структура конференции
 */
export type TConf = {
  id: number;
  slug: string;
  isEnabled: boolean;
  isEnglishEnabled?: boolean;
  conferenceNameRu: string;
  statusRu?: string;
  statusEn?: string;
  startDate: string|number;
  endDate: string|number;
  closingDateForApplications?: string|number;
  closingDateForRegistrations?: string|number;
  pages: IPath[];
  meetingPointRu?: string;
  meetingPointEn?: string;
  webSite?: string;
  email?: string;
  phone?: string;
  conferenceSections?: ISection[];
  conferenceOrganizers?: IOrganizer[];
  conferenceNameEn: string;
}

/**
 * Структура путей в конференции
 */
export interface IPath {
  pageNameRu: string;
  pageNameEn?: string;
  path: string;
}

export type TConfForm = {
  slug: string;
  conferenceNameRu: string;
  conferenceNameEn?: string;
  statusRu?: string;
  statusEn?: string;
  isEnglishEnabled: boolean;
  startDate: string;
  endDate: string;
}
