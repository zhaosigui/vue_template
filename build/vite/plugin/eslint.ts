import eslint from 'vite-plugin-eslint';
export function configEslintPlugin() {
  return eslint({
    // 检测不到src下的js和ts vue
    include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue', 'src/**/*.js'],
    exclude: ['node_modules'],
    cache: false,
  });
}
