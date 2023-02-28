import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import purgeIcons from 'vite-plugin-purge-icons';
// import windiCSS from 'vite-plugin-windicss';
// import VitePluginCertificate from 'vite-plugin-mkcert';
//import vueSetupExtend from 'vite-plugin-vue-setup-extend';
// import { configHtmlPlugin } from './html';
// import { configPwaConfig } from './pwa';
// import { configMockPlugin } from './mock';
import { configCheckerPlugin } from './checker';
import { configComponentsPlugin } from './components';
import { configCompressPlugin } from './compress';
import { configEslintPlugin } from './eslint';
import { configLegacyPlugin } from './legacy';
import { configStyleImportPlugin } from './styleImport';
import { configStylelintPlugin } from './stylelint';
// import { configVisualizerConfig } from './visualizer';
// import { configThemePlugin } from './theme';
// import { configImageminPlugin } from './imagemin';
// import { configSvgIconsPlugin } from './svgSprite';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    // VITE_USE_IMAGEMIN,
    // VITE_USE_MOCK,
    VITE_LEGACY,
    // VITE_BUILD_COMPRESS,
    // VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    // support name
    // vueSetupExtend(),
    // VitePluginCertificate({
    //   source: 'coding',
    // }),
    configComponentsPlugin(),
  ];

  // vite-plugin-windicss
  // vitePlugins.push(windiCSS());

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(configLegacyPlugin());

  // vite-plugin-eslint
  !isBuild && vitePlugins.push(configEslintPlugin());

  // vite-plugin-checker
  !isBuild && vitePlugins.push(configCheckerPlugin());

  // vite-plugin-stylelint
  !isBuild && vitePlugins.push(configStylelintPlugin());

  // vite-plugin-html
  // vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-svg-icons
  // vitePlugins.push(configSvgIconsPlugin(isBuild));

  // vite-plugin-mock
  // VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  // vite-plugin-purge-icons
  // vitePlugins.push(purgeIcons());

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin(isBuild));

  // rollup-plugin-visualizer
  // vitePlugins.push(configVisualizerConfig());

  // vite-plugin-theme
  // vitePlugins.push(configThemePlugin(isBuild));

  // The following plugins only work in the production environment
  if (isBuild) {
    // vite-plugin-imagemin
    // VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(
      // configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
      configCompressPlugin(),
    );

    // vite-plugin-pwa
    // vitePlugins.push(configPwaConfig(viteEnv));
  }
  return vitePlugins;
}
