import { locales } from '@/constants/i18n.constants';
import { IUser } from "@/types/auth.types";

export interface INames {
  firstName: string;
  lastName: string;
  middleName?: string;
}

type Locale = Uppercase<typeof locales[number]>;

const undefinedNames: Record<Locale, INames> = {
  RU: {
    firstName: 'Неизвестный',
    lastName: 'Неизвестный'
  },
  EN: {
    firstName: 'Unknown',
    lastName: 'Unknown'
  }
}

export function getUserNames(user?: IUser|null, locale?: typeof locales[number]|Locale): INames {
  locale = (locale || 'en').toUpperCase() as Locale;
  
  if (!user) return undefinedNames[locale];
  
  let firstName = user.names?.[locale]?.firstName;
  let lastName = user.names?.[locale]?.lastName;
  let middleName = user.names?.[locale]?.middleName;

  const defaultLocale = user.preferredLocale;

  if (!firstName) firstName = user.names?.[defaultLocale]?.firstName;
  if (!lastName) lastName = user.names?.[defaultLocale]?.lastName;
  if (!middleName) middleName = user.names?.[defaultLocale]?.middleName;
  console.log(user, locale)

  return {
    firstName: firstName || undefinedNames[locale].firstName,
    lastName: lastName || undefinedNames[locale].lastName,
    middleName: middleName
  }
}