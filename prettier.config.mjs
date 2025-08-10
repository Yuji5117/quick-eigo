/**
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 100,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
