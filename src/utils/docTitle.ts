import { t } from 'i18next'

type Content = {
  title: string
  description: string
}

type MetaMap = {
  [key: string]: Content
}

const metaMap: MetaMap = {
  '/dashboard': {
    title: '',
    description: ''
  },
  '/login': {
    title: t('login'),
    description: t('login')
  },
  '/profile': {
    title: t('profile'),
    description: t('profile')
  },
  '/register': {
    title: t('signUp'),
    description: t('signUp')
  },
  '/post': {
    title: t('blog'),
    description: t('blog')
  }
}

/**
 * Returns the title of a page based on its route path.
 * @param {string} path - The path of the page route.
 * @returns {string} The title of the page with the site name appended.
 */
export const getTitleFromRoute = (path: keyof MetaMap): string => {
  if (metaMap[path] && path !== '/dashboard') {
    return `${metaMap[path].title} | ${t('blogAdminPanel')}`
  }

  return t('blogAdminPanel')
}

/**
 * Returns the description of a page based on its route path.
 * @param {string} path - The path of the page route.
 * @returns {string} The description of the page.
 */
export const getDescriptionFromRoute = (path: keyof MetaMap): string => {
  if (metaMap[path] && path !== '/dashboard') {
    return metaMap[path].description
  }

  return t('blogAdminPanel')
}
