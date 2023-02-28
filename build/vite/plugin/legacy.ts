// 这个也可以解决兼容性问题
// https://vitejs.dev/config/
// legacy优先级高于build
import legacy from '@vitejs/plugin-legacy'; // 必须安装terser
export function configLegacyPlugin() {
  return legacy({
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
      'esnext.string.match-all',
    ],
  });
}
