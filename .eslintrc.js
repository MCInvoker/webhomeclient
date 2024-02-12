module.exports = {
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  // plugins: ['import'],
  rules: {
    'no-trailing-spaces': 0,
    'padded-blocks': 0,
    'object-curly-newline': 0,
    'import/prefer-default-export': 0,
    'no-undef': 0,
    'no-shadow': 0,
    'arrow-body-style': 0,
    'react/prop-types': 0,
    'no-param-reassign': 0,
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
