// Under Jest there's no window to measure, so the safe-area components become
// plain pass-throughs and insets read as zero.
const React = require('react');
const { View } = require('react-native');

const passthrough = ({ children }) => React.createElement(View, null, children);
const insets = { top: 0, bottom: 0, left: 0, right: 0 };

module.exports = {
  SafeAreaProvider: passthrough,
  SafeAreaView: passthrough,
  useSafeAreaInsets: () => insets,
  SafeAreaInsetsContext: React.createContext(insets),
};
