// next-intl.config.js
const nextIntlConfig = {
  // The locales you want to support
  locales: ['en', 'ar'],
  
  // The default locale
  defaultLocale: 'en',

  // When true, the locale detection and setting is done
  // automatically by next-intl middleware
  localeDetection: true,
  
  // If you want to set a specific locale cookie name
  localeCookie: 'NEXT_LOCALE'
};

module.exports = nextIntlConfig;

// For ES modules compatibility
exports.default = nextIntlConfig;