/* eslint @typescript-eslint/no-var-requires: "off" */
const mix = require('laravel-mix');
require('laravel-mix-eslint');
require('laravel-mix-bundle-analyzer');
const MixGlob = require('laravel-mix-glob');

const mixGlob = new MixGlob({ mix });
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Sage application. By default, we are compiling the Sass file
 | for your application, as well as bundling up your JS files.
 |
 */

mix.setPublicPath('build');

if (mix.inProduction()) {
  mix.version();
}

mix.options({
  terser: {
    terserOptions: {
      // keep_fnames: true,
      // keep_classnames: true,
      mangle: false,
      compress: false,
    },
  },
});

mix.sass('scss/ripple.scss', 'ripple.min.css');

mixGlob.ts('src/**/*.ts', '.', null, {
  base: 'src',
});
mix.eslint({
  fix: true,
  extensions: ['js', 'ts'],
  //...
});
// .extract();

mix.options({
  processCssUrls: false,
});

mix.sourceMaps(false, 'source-map').version().bundleAnalyzer({
  openAnalyzer: false,
  analyzerMode: 'static',
});
