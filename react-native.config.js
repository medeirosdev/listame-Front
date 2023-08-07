module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/app/assets/fonts/'],
  dependencies: {
    /**
     * Desabilita o auto-linking do react-native-vector-icons pois
     * o mesmo estava duplicando as fontes inseridas no app e quebrando a build
     * do iOS.
     * https://github.com/oblador/react-native-vector-icons/issues/1077
     */
    // 'react-native-vector-icons': {
    //   platforms: {
    //     ios: null,
    //     android: null,
    //   },
    //   assets: [],
    // },
  },
};
