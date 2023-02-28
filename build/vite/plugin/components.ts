// https://github.com/antfu/unplugin-vue-components
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export function configComponentsPlugin() {
  return Components({
    // relative paths to the directory to search for components.
    // // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
    // dirs: ['src/components'],

    // valid file extensions for components.
    // extensions: ['vue'],

    // Glob patterns to match file names to be detected as components.
    // When specified, the `dirs` and `extensions` options will be ignored.
    // globs: ['src/components/*.{vue}'],

    // search for subdirectories
    // deep: true,  // 搜索子目录

    // resolvers for custom components
    resolvers: [AntDesignVueResolver()],

    // generate `components.d.ts` global declarations,
    // also accepts a path for custom filename
    // default: `true` if package typescript is installed
    dts: 'types/components.d.ts', // 配置文件生成位置，默认生成components.d.ts

    // Allow subdirectories as namespace prefix for components.
    // // 允许子目录作为组件的命名空间前缀。
    // directoryAsNamespace: false,

    // Collapse same prefixes (camel-sensitive) of folders and components
    // to prevent duplication inside namespaced component name.
    // works when `directoryAsNamespace: true`
    // collapseSamePrefixes: false,

    // 忽略命名空间前缀的子目录路径
    // 当`directoryAsNamespace: true` 时有效
    // Subdirectory paths for ignoring namespace prefixes.
    // works when `directoryAsNamespace: true`
    // globalNamespaces: [],

    // auto import for directives
    // default: `true` for Vue 3, `false` for Vue 2
    // Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
    // To install Babel, run: `npm install -D @babel/parser`
    // 自动导入指令
    // 默认值：Vue 3 的`true`，Vue 2 的`false`
    // 需要 Babel 来为 Vue 2 进行转换，出于性能考虑，它默认处于禁用状态。
    // directives: true,

    // Transform path before resolving
    // importPathTransform: (v) => v,

    // Allow for components to override other components with the same name
    // allowOverrides: false,

    // filters for transforming targets
    include: [/\.vue$/, /\.vue\?vue/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],

    // Vue version of project. It will detect automatically if not specified.
    // Acceptable value: 2 | 2.7 | 3
    version: 3,

    // Only provide types of components in library (registered globally)
    // types: [],
  });
}
