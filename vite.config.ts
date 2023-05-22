import { loadEnv } from 'vite';
import type { ConfigEnv, UserConfig } from 'vite';
import { resolve } from 'path';
import { createVitePlugins } from './build/vite/plugin';
import { wrapperEnv } from './build/utils';
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  //据当前工作目录中的 `mode` 加载 .env 文件
  //设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  // const config = loadEnv(mode, process.cwd(), '')  // { VITE_APP_TITLE: '行政争议实质性化解平台dev' }
  const env = loadEnv(mode, process.cwd(), ''); // { VITE_APP_TITLE: '行政争议实质性化解平台dev' }
  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);
  // const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;
  const isBuild = command === 'build';
  return {
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
      },
    },
    // 全局变量 不知道为什么import.meta.env.VITE_APP_TITLE为undefined
    define: {
      'process.env': env,
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    //配 置项目路径别名，在开发时不需要写完整的路径名称
    resolve: {
      // 不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    build: {
      // target: 'es2015'
      /**
       * https://cn.vitejs.dev/config/build-options.html#build-terseroptions
       * 当设置为 'terser' 时必须先安装 Terser。（未安装）
       * 当 minify=“minify:'terser'” 解开注释
       */
      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: true,
      //     drop_debugger: true,
      //   },
      // },
      // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能，默认true
      // reportCompressedSize: false,
      //规定触发警告的 chunk 大小。（以 kbs 为单位） 默认500
      // chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // https://rollupjs.org/configuration-options/#output-manualchunks
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const arr = id.toString().split('node_modules/')[1].split('/');
              console.log(arr[0]);
              if (arr[0] === 'ant-design-vue') {
                return 'chunk_ant-design-vue';
              }
              if (arr[0] === '@vue ') {
                return 'chunk_@vue';
              }
              return 'vendor';
            }
          },
        },
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    // envPrefix:"APP_",
    envDir: 'env',
    // 预构建
    optimizeDeps: {
      include: ['vue', 'pinia', 'vue-router', 'ant-design-vue/es'],
      exclude: [],
    },
  };
};
