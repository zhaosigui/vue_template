import compressPlugin from 'vite-plugin-compression';
export function configCompressPlugin() {
  // compress: 'gzip' | 'brotli' | 'none',
  // deleteOriginFile = false,
  return compressPlugin({
    // filter：// 过滤器，对哪些类型的文件进行压缩，默认为 ‘/.(js|mjs|json|css|html)$/i’
    verbose: true, //：是否在控制台输出压缩结果，默认为 true
    threshold: 10240, // 启用压缩的文件大小限制，单位是字节，默认为 0
    disable: false, // 是否禁用压缩，默认为 false
    deleteOriginFile: false, // 压缩后是否删除原文件，默认为 false
    algorithm: 'gzip', // 采用的压缩算法，默认是 gzip
    ext: '.gz', // 生成的压缩包后缀
  });
}
