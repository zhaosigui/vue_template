module.exports = {
  //  新增 autoprefixer 插件，并解决 legacy 不生效问题
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
      grid: true,
    },
  },
};
