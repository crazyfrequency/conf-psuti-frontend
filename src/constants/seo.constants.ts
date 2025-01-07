import { Metadata } from "next";

/**
 * индексировать страницу
 */
export const INDEX_PAGE: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
};

/**
 * не индексировать страницу
 */
export const NO_INDEX_PAGE: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  }
};
