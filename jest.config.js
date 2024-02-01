const esModules = ['@react-native', 'react-native', 'i18n-js'].join('|');

module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
};
