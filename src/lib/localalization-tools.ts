import { type BigLocales, locales } from '@/constants/i18n.constants';
import { IUser } from "@/types/auth.types";
import { IAdminUser } from '@/types/user.types';

export interface INames {
  firstName: string;
  lastName: string;
  middleName?: string;
}

const undefinedNames: Record<BigLocales, INames> = {
  RU: {
    firstName: 'Неизвестный',
    lastName: 'Неизвестный'
  },
  EN: {
    firstName: 'Unknown',
    lastName: 'Unknown'
  }
}

export function getUserNames(user?: IUser|null, locale?: typeof locales[number]|BigLocales): INames {
  locale = (locale || 'en').toUpperCase() as BigLocales;
  
  if (!user) return undefinedNames[locale];
  
  let firstName = user.names?.[locale]?.firstName;
  let lastName = user.names?.[locale]?.lastName;
  let middleName = user.names?.[locale]?.middleName;

  const defaultLocale = user.preferredLocale;

  if (!firstName) firstName = user.names?.[defaultLocale]?.firstName;
  if (!lastName) lastName = user.names?.[defaultLocale]?.lastName;
  if (!middleName) middleName = user.names?.[defaultLocale]?.middleName;

  return {
    firstName: firstName || undefinedNames[locale].firstName,
    lastName: lastName || undefinedNames[locale].lastName,
    middleName: middleName
  }
}

export function getAdminNames(user?: IAdminUser|null, locale?: typeof locales[number]|BigLocales): INames {
  locale = (locale || 'en').toUpperCase() as BigLocales;
  
  if (!user) return undefinedNames[locale];
  
  let firstName = user.names?.[locale]?.firstName;
  let lastName = user.names?.[locale]?.lastName;
  let middleName = user.names?.[locale]?.middleName;
  
  return {
    firstName: firstName || undefinedNames[locale].firstName,
    lastName: lastName || undefinedNames[locale].lastName,
    middleName: middleName
  }
}