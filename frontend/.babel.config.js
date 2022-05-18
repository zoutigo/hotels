module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-es2016'],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-spread',
  ],
}
