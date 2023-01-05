import { defineUserConfig } from 'vuepress';
import { backToTopPlugin } from '@vuepress/plugin-back-to-top';
import { defaultTheme } from 'vuepress';

export default defineUserConfig({
  description: 'Ripple config',
  head: [
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css?family=Nunito:300,400,400i,500,600,800',
        rel: 'stylesheet',
        type: 'text/css',
      },
    ],
  ],
  lang: 'en-US',

  plugins: [backToTopPlugin()],

  theme: defaultTheme({
    navbar: [
      {
        link: 'https://github.com/digital-swing/ripple/blob/main/CHANGELOG.md',
        text: 'Changelog',
      },
      { link: 'https://github.com/digital-swing/ripple', text: 'GitHub' },
    ],

    sidebar: ['/interfaces/RippleConfig.html'],

    sidebarDepth: 2,
  }),

  title: 'Ripple',
});
