export const IMG_PREFIX =
  process.env.NODE_ENV === 'production'
    ? process.env.SERVER_ADRESS
    : 'http://localhost:3500/images/'
