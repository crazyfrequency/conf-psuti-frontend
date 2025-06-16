import type { UUID } from "crypto"

export interface IApplicationAuthor {
  id?: number
  firstNameRu?: string
  firstNameEn?: string
  lastNameRu?: string
  lastNameEn?: string
  middleNameRu?: string
  middleNameEn?: string
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export interface IApplication {
  id?: number
  titleRu?: string
  titleEn?: string
  descriptionRu?: string
  descriptionEn?: string
  sectionId?: number
  authors: IApplicationAuthor[]
  status?: ApplicationStatus
  version?: number
  userId?: UUID
}
