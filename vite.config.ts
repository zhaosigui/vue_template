import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy' // 必须安装terser
import checker from 'vite-plugin-checker'
import path from 'path'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
function resolve(dir) {
  return path.join(__dirname, dir);
}

export default ({ mode }) => {
  //据当前工作目录中的 `mode` 加载 .env 文件
  //设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  // const config = loadEnv(mode, process.cwd(), '')  // { VITE_APP_TITLE: '行政争议实质性化解平台dev' }
  const config = loadEnv(mode, process.cwd())  // { VITE_APP_TITLE: '行政争议实质性化解平台dev' }

  return defineConfig({
    base: '/',
    server: {
      proxy: {
        // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        // 正则表达式写法：http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
        '^/fallback/.*': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fallback/, ''),
        },
      }
    },
    // 全局变量 不知道为什么import.meta.env.VITE_APP_TITLE为undefined
    define: {
      'process.env': config
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 全局导入
          additionalData: '@use "@assets/css/global.scss";'
          // additionalData: `$injectedColor: orange;`,
        },
      }
    },
    //配 置项目路径别名，在开发时不需要写完整的路径名称
    resolve: {
      // 不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
      alias: {
        "@": resolve("src"),
        "@api": resolve("src/api"),
        "@assets": resolve("src/assets"),
        "@components": resolve("src/components"),
        "@plugins": resolve("src/plugins"),
        "@router": resolve("src/router"),
        "@store": resolve("src/store"),
        "@utils": resolve("src/utils"),
        "@views": resolve("src/views"),
      }
    },
    // 可以解决兼容性问题
    build: {
      rollupOptions: {}
      // target: 'es2015'
    },
    // 这个也可以解决兼容性问题
    // https://vitejs.dev/config/
    // legacy优先级高于build
    plugins: [vue(), legacy({
      targets: ['chrome 52', 'IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // 面向IE11时需要此插件
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.array.filter',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.for-each',
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all'
      ],
    }),
    // !process.env.VITEST ? checker({ typescript: true, vueTsc: true }) : undefined,
    !process.env.VITEST ? checker({ typescript: true, vueTsc: true }) : undefined,
      // 动态导入
      // dynamicImportVars({})
    ],
    //  envPrefix:"APP_",
    envDir: "env"
  })
}

