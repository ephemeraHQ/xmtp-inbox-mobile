const {getDefaultConfig} = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const {resolver} = config;
module.exports = (() => {
  config.transformer.getTransformOptions = async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  });
  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  config.resolver.assetExts = resolver.assetExts.filter(ext => ext !== 'svg');
  config.resolver.sourceExts = [...resolver.sourceExts, 'svg'];

  return config;
})();
