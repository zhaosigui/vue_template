import stylelint from 'vite-plugin-stylelint';
export function configStylelintPlugin() {
  return stylelint({ exclude: ['node_modules'], cache: false });
}
