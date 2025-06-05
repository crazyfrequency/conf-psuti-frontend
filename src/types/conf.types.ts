/**
 * Структура секций конференции
 */
export interface ISection {
  id: number;
  sectionNameRu: string;
  sectionNameEn?: string;
  placeRu?: string;
  placeEn?: string;
  isDefault: boolean;
}

export type TSectionForm = Partial<ISection>;

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
  logo?: string;
  isEnabled: boolean;
  isEnglishEnabled?: boolean;
  isEnabledForRegistration?: boolean;
  supportedFileFormats?: string;
  applicationEditingOption?: number;
  participationTypes?: number;
  conferenceNameRu: string;
  statusRu?: string;
  statusEn?: string;
  startDate: string|number;
  endDate: string|number;
  closingDateForApplications?: string|number;
  closingDateForRegistrations?: string|number;
  pages: IPage[];
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
export interface IPage {
  id: number;
  pageNameRu: string;
  pageNameEn?: string;
  path: string;
  pageIndex: number;
  isEnabled: boolean;
}

/**
 * Структура контента страницы конференции
 */
export type TConfPage = IPage & {
  htmlContentRu?: string;
  htmlContentEn?: string;
}

/**
 * Структура контента страницы конференции на определенном языке
 */
export type TLocalizedConfPage = {
  lang: string;
  path: string;
  pageName: string;
  htmlContent: string;
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

export type TConfPageForm = {
  id?: number|null;
  pageNameRu: string;
  pageNameEn?: string|null;
  path: string;
  pageIndex: number;
}

export type TConfPageContentForm = {
  isEnabled: boolean;
  htmlContentRu: string;
  htmlContentEn?: string|null;
}
