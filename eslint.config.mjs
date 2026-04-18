import nextConfig from 'eslint-config-next/core-web-vitals';

export default [
  { ignores: ['lib/graphql/generated/**'] },
  ...nextConfig,
];
