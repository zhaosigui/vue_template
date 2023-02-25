module.exports = {
  root: true,
  // stylelint-order是CSS属性排序插件(
  plugins: ['stylelint-order'],
  // stylelint-config-prettier:  配置stylelint和prettier兼容
  // stylelint-config-standard: Stylelint的标准可共享配置规则，详细可查看官方文档
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // postcss-html: 识别html/vue 中的<style></style>标签中的样式
  customSyntax: 'postcss-html',
  /**
   * null  => 关闭该规则
   */
  rules: {
    'scss/at-import-partial-extension': null, // 解决不能引入scss文件
    'function-no-unknown': null,
    'selector-class-pattern': null, //指定类选择器的模式。
    'selector-pseudo-class-no-unknown': [
      //禁止未知的伪类选择器。
      true,
      {
        ignorePseudoClasses: ['global', 'deep'],
      },
    ],
    // 禁止未知的伪元素选择器。
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    //禁止未知的@规则。
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'if',
          'each',
          'include',
          'mixin',
        ],
      },
    ],
    //禁止空源码。
    'no-empty-source': null,
    'string-quotes': null, //指定字符串使用单引号或双引号（可自动修复）。
    'named-grid-areas-no-invalid': null,
    'unicode-bom': 'never',
    'no-descending-specificity': null, //禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器。
    'font-family-no-missing-generic-family-keyword': null, //禁止在字体族名称列表中缺少通用字体族关键字。
    'declaration-colon-space-after': 'always-single-line', //要求在声明块的冒号之后必须有一个空格或不能有空白符（可自动修复）。
    'declaration-colon-space-before': 'never', //要求在声明块的冒号之前必须有一个空格或不能有空白符（可自动修复）。
    // 'declaration-block-trailing-semicolon': 'always',
    'rule-empty-line-before': [
      //要求或禁止在规则之前的空行（可自动修复）
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }], //禁止未知的单位。
    'order/order': [
      [
        'dollar-variables',
        'custom-properties',
        'at-rules',
        'declarations',
        {
          type: 'at-rule',
          name: 'supports',
        },
        {
          type: 'at-rule',
          name: 'media',
        },
        'rules',
      ],
      { severity: 'warning' },
    ],
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
  overrides: [
    {
      files: ['*.vue', '**/*.vue', '*.html', '**/*.html'],
      extends: ['stylelint-config-recommended'],
      rules: {
        'keyframes-name-pattern': null,
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['deep', 'global', 'v-deep'],
          },
        ],
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
          },
        ],
      },
    },
    {
      // 识别scss文件
      files: ['*.scss', '**/*.sass'],
      customSyntax: 'postcss-scss',
      extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
    },
  ],
};
