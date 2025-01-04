import { Metadata } from "next";

export const INDEX_PAGE: Metadata = {
  robots: {
    index: true,
    follow: true,
    
  }
};

export const NO_INDEX_PAGE: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export const SITE_DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API ?? 'http://localhost:8000';
export const SITE_DOMAIN_API_LOCAL = process.env.LOCAL_DOMAIN_API ?? 'http://localhost:8000';

export const HELP_DESK_EMAIL = 'helpdesk@psuti.ru'
export const MAIL = 'nio@psuti.ru'
export const PHONE = '+7 (846) 339-11-09'
