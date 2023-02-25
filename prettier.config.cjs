module.exports = {
  printWidth: 100, // 一行的字符数，如果超过会进行换行，默认为100
  semi: true, //句尾必须加分号
  vueIndentScriptAndStyle: true, // 是否缩进 Vue 文件中的代码<script>和<style>标签
  singleQuote: true, //单引号
  trailingComma: 'all', // 在对象或数组最后一个元素后面是否加逗号，有三个可选值"<none|es5|all>"
  proseWrap: 'never', // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  htmlWhitespaceSensitivity: 'strict', //空格被认为是敏感的
  endOfLine: 'auto', // 结尾是 \n \r \n\r auto
};
