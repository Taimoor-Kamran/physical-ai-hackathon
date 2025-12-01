import { themes as prismThemes } from 'prism-react-renderer';

import type { Config } from '@docusaurus/types';

import type * as Preset from '@docusaurus/preset-classic';



const config: Config = {

  title: 'Physical AI & Humanoid Robotics',

  tagline: 'Learn about Physical AI and Humanoid Robotics with hands-on labs',

  favicon: 'img/favicon.ico',



  url: 'https://taimoor-kamran.github.io',

  baseUrl: '/physical-ai-hackathon/',



  organizationName: 'Taimoor-Kamran',

  projectName: 'physical-ai-hackathon',



  onBrokenLinks: 'ignore',

  onBrokenMarkdownLinks: 'warn',



  i18n: {

    defaultLocale: 'en',

    locales: ['en'],

  },



  presets: [

    [

      'classic',

      {

        docs: {

          sidebarPath: './sidebars.js',

          routeBasePath: 'docs',

          editUrl: 'https://github.com/Taimoor-Kamran/physical-ai-hackathon/edit/main/frontend/',

        },

        blog: {

          showReadingTime: true,

          editUrl: 'https://github.com/Taimoor-Kamran/physical-ai-hackathon/edit/main/frontend/',

        },

        theme: {

          customCss: './src/css/custom.css',

        },

      } satisfies Preset.Options,

    ],

  ],



  themeConfig: {

    image: 'img/docusaurus-social-card.jpg',

    colorMode: {

      respectPrefersColorScheme: true,

    },

    navbar: {

      title: 'Physical AI & Humanoid Robotics',

      logo: {

        alt: 'Logo',

        src: 'img/logo.svg',

      },

      items: [

        { to: '/docs/introduction', label: 'Book', position: 'left' },

        { to: '/blog', label: 'Blog', position: 'left' },

        { href: 'https://github.com/Taimoor-Kamran/physical-ai-hackathon', label: 'GitHub', position: 'right' },

      ],

    },

    footer: {

      style: 'dark',

      links: [

        { title: 'Docs', items: [{ label: 'Book', to: '/docs/introduction' }] },

        {

          title: 'Community',

          items: [

            { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/docusaurus' },

            { label: 'Discord', href: 'https://discordapp.com/invite/docusaurus' },

            { label: 'X', href: 'https://x.com/docusaurus' },

          ],

        },

        {

          title: 'More',

          items: [

            { label: 'Blog', to: '/blog' },

            { label: 'GitHub', href: 'https://github.com/Taimoor-Kamran/physical-ai-hackathon' },

          ],

        },

      ],

      copyright: `Copyright © ${new Date().getFullYear()} Physical AI & Humanoid Robotics. Built with Docusaurus.`,

    },

    prism: {

      theme: prismThemes.github,

      darkTheme: prismThemes.dracula,

    },

  } satisfies Preset.ThemeConfig,

};



export default config;
