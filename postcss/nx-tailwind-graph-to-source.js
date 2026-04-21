const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const path = require('path');

// If there's now tailwind classes generated for an imported library clear .nx/workspace data.
// It uses cached project graph to generate glob patterns for dependencies.
// There's chance it didn't get updated if you imported a new library. Restarting the server without removing cache doesn't help.

module.exports = () => {
  return {
    postcssPlugin: 'nx-tailwind-graph-to-source',
    Once(root) {
      root.walkAtRules('nxgraphsource', (atRule) => {
        const cssFilePath = root.source?.input?.file || process.cwd();
        const appRoot = findNearestAppRoot(cssFilePath);
        // console.log('appRoot', appRoot);
        if (!appRoot) return;

        const globPattern = getGlobPattern(atRule.params);

        // console.log('globPattern', globPattern);

        const globs = [
          ...createGlobPatternsForDependencies(appRoot, globPattern),
          path.join(appRoot, globPattern),
        ];
        // console.log('globs', globs);
        // Inject @source rules at the position of @nxglobpatterns
        globs.reverse().forEach((glob) => {
          atRule.parent.insertBefore(atRule, {
            name: 'source',
            type: 'atrule',
            params: `"${glob.replace(/\\/g, '/')}"`,
          });
        });

        atRule.remove();
      });
    },
  };
};

module.exports.postcss = true;

function findNearestAppRoot(startPath) {
  let dir = path.dirname(startPath);

  while (dir !== path.resolve(dir, '..')) {
    const relative = path.relative(process.cwd(), dir);
    if (relative.startsWith('apps') || relative.startsWith('libs')) {
      return dir;
    }
    dir = path.resolve(dir, '..');
  }
  return null;
}

function getGlobPattern(params) {
  if (params === '') {
    return '/**/*.{html,ts}';
  }
  return params.replace(/^['"](.*)['"]$/, '$1');
}
