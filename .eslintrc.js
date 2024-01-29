module.exports = {
  extends: ['airbnb'],
  plugins: ['import'],
  rules: {
    'import/prefer-default-export': 0,
    'no-undef': 0,
    'no-shadow': 0,
    'react/prop-types': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    camelcase: 0,
    'no-unused-vars': 2,
    'import/order': [
      2,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', '@ant-design', 'umi', '@/**'],
        'newlines-between': 'always',
      },
    ],
  },
};
