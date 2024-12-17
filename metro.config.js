const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

// Obtenha a configuração padrão
const config = getDefaultConfig(__dirname);

// Modifique as extensões de arquivos para lidar com SVGs
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

// Combine com a configuração do NativeWind
module.exports = withNativeWind(config, { input: './src/app/style/global.css' });
