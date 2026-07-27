const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Let Metro compile native-language sources. The transfer core is Rust, so we
// register the transformer and teach the resolver about .rs files.
module.exports = mergeConfig(defaultConfig, {
  transformer: {
    babelTransformerPath: require.resolve(
      'react-native-cross-native/metro-transformer',
    ),
  },
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'rs'],
  },
});
