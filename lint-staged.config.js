module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'npx tsc --pretty --noEmit',

  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': filenames => [
    `npx eslint --ext ts --ext tsx --ext js ${filenames.join(' ')}`,
    `npx prettier --write ${filenames.join(' ')}`
  ]
};
