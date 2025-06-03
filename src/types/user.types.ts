import { BigLocales } from "@/constants/i18n.constants"
import type { UUID } from "crypto"
import { INames } from "./auth.types"

export interface IAdminUser {
  id: UUID
  email: string
  names: Partial<Record<BigLocales, INames>>
  permissions: number
}
