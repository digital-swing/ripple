const tsConfig = require('./tsconfig.json');
const tsTestConfig = require('./tsconfig.test.json');

module.exports = {
  env: {
    amd: true,
    browser: true,
    es6: true,
    jquery: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  ignorePatterns: [
    '**/node_modules/*.[tj]s',
    '**/vendor/*.[tj]s',
    '**/dist/**/*.[tj]s',
    '**/public/**/*.[tj]s',
    '**/build/**/*.[tj]s',
  ].concat(tsConfig.exclude),
  overrides: [
    {
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
      ],
      files: tsConfig.include,
      parser: '@typescript-eslint/parser',
      // Your TypeScript files extension
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },

      plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-tsdoc'],
    },

    {
      env: {
        jest: true,
        'jest/globals': true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
      ],
      files: tsTestConfig.include,

      parser: '@typescript-eslint/parser',
      // Your TypeScript files extension
      parserOptions: {
        project: ['./tsconfig.test.json'], // Specify it only for TypeScript files
      },
      plugins: ['jest'],
    },
    {
      files: ['src/plugins/**'],
      rules: {
        'no-param-reassign': [
          'error',
          { ignorePropertyModificationsFor: ['ctx'], props: true },
        ],
      },
    },
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './.babelrc.cjs',
    },
    ecmaFeatures: {
      generators: false,
      globalReturn: true,
      objectLiteralDuplicateProperties: false,
    },
    ecmaVersion: 'latest',
    extraFileExtensions: ['.cjs'],
    sourceType: 'module',
  },
  plugins: ['import', 'prettier', 'sort-keys-fix', 'typescript-sort-keys'],
  root: true,
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],

    // 'no-undef': 'warn',
    'func-names': 0,

    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'webpack.config.cjs',
          'webpack.prod.cjs',
          'webpack.dev.cjs',
          'rollup.config.ts',
          'setupTestFrameworkScriptFile.ts',
          '.eslintrc.cjs',
          '__tests__/**/*',
          '__mocks__/**/*',
        ],
      },
    ],
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',

    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'no-param-reassign': [
      'error',
      {
        ignorePropertyModificationsFor: ['state'],
        props: true,
      },
    ],
    'no-underscore-dangle': 0,
    'sort-imports': [
      'warn',
      {
        allowSeparatedGroups: false,
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'sort-keys-fix/sort-keys-fix': 'warn',

    'tsdoc/syntax': 'warn',
    'typescript-sort-keys/interface': 'warn',
    'typescript-sort-keys/string-enum': 'warn',
  },
  settings: {
    'import/core-modules': [],
    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],
    'import/order': [
      'error',
      {
        groups: [
          'index',
          'sibling',
          'parent',
          'internal',
          'external',
          'builtin',
          'object',
          'type',
        ],
      },
    ],
  },
};
