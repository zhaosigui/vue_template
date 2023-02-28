import checker from 'vite-plugin-checker';
export function configCheckerPlugin() {
  return checker({ typescript: true, vueTsc: true });
}
