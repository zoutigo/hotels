export const IMG_PREFIX =
  process.env.NODE_ENV === 'production'
    ? process.env.IMG_PREFIX
    : 'http://localhost:3500/images/'
