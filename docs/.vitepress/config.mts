import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'OhMyOpenSource! Guidelines',
  description:
    'Open standards, commit conventions and contribution guidelines for the OhMyOpenSource! organization.',
  lang: 'en-US',

  srcDir: '.',
  outDir: '../dist',
  cleanUrls: true,

  // ================================
  // SEO & SOCIAL MEDIA META TAGS
  // ================================
  head: [
    ['meta', { charset: 'utf-8' }],
    [
      'meta',
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],

    ['meta', { name: 'author', content: 'OhMyOpenSource!, Luxauram' }],
    ['meta', { name: 'robots', content: 'index, follow' }],

    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'OhMyOpenSource! Guidelines' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Open standards and contribution guidelines for OhMyOpenSource!',
      },
    ],
    [
      'meta',
      { property: 'og:site_name', content: 'OhMyOpenSource! Guidelines' },
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://guidelines.ohmyopensource.org/og-image.png',
      },
    ],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],

    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@ohmyopensource' }],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://guidelines.ohmyopensource.org/og-image.png',
      },
    ],

    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'alternate icon', href: '/favicon.ico' }],

    ['meta', { name: 'theme-color', content: '#6366f1' }],
  ],

  themeConfig: {
    logo: '/omos-logo.png',
    siteTitle: 'OhMyOpenSource! Guidelines',

    // ================================
    // TOP NAVIGATION
    // ================================
    nav: [
      { text: 'Overview', link: '/index' },
      {
        text: 'Git',
        activeMatch: '/git/',
        items: [
          { text: 'Commit Conventions', link: '/git/commit-conventions' },
          { text: 'Branching Strategy', link: '/git/branching-strategy' },
          {
            text: 'Pull Request Guidelines',
            link: '/git/pull-request-guidelines',
          },
          {
            text: 'Contributing Workflow',
            link: '/git/contributing-workflow',
          },
        ],
      },
      {
        text: 'Code',
        activeMatch: '/code/',
        items: [
          { text: 'Code Style', link: '/code/code-style' },
          { text: 'Code Review', link: '/code/code-review' },
          { text: 'Documentation', link: '/code/documentation' },
        ],
      },
      {
        text: 'Project',
        activeMatch: '/project/',
        items: [
          { text: 'Issue Tracking', link: '/project/issue-tracking' },
          { text: 'Versioning', link: '/project/versioning' },
          { text: 'Release Process', link: '/project/release-process' },
        ],
      },
      {
        text: 'Security',
        activeMatch: '/security/',
        items: [
          { text: 'Secrets Management', link: '/security/secrets-management' },
          { text: 'Dependency Policy', link: '/security/dependency-policy' },
        ],
      },
      { text: 'Templates', link: '/templates/index' },
      {
        text: 'GitHub',
        link: 'https://github.com/ohmyopensource/ohmyopensource-guidelines',
        target: '_blank',
      },
    ],

    // ================================
    // SIDEBARS
    // ================================
    sidebar: {
      // ================================
      // GIT
      // ================================
      '/git/': [
        {
          text: '<= Guidelines',
          link: '/',
        },
        {
          text: 'Git',
          items: [
            { text: 'Commit Conventions', link: '/git/commit-conventions' },
            { text: 'Branching Strategy', link: '/git/branching-strategy' },
            {
              text: 'Pull Request Guidelines',
              link: '/git/pull-request-guidelines',
            },
            {
              text: 'Contributing Workflow',
              link: '/git/contributing-workflow',
            },
          ],
        },
      ],

      // ================================
      // CODE
      // ================================
      '/code/': [
        {
          text: '<= Guidelines',
          link: '/',
        },
        {
          text: 'Code',
          items: [
            { text: 'Code Style', link: '/code/code-style' },
            { text: 'Code Review', link: '/code/code-review' },
            { text: 'Documentation', link: '/code/documentation' },
          ],
        },
      ],

      // ================================
      // PROJECT
      // ================================
      '/project/': [
        {
          text: '<= Guidelines',
          link: '/',
        },
        {
          text: 'Project',
          items: [
            { text: 'Issue Tracking', link: '/project/issue-tracking' },
            { text: 'Versioning', link: '/project/versioning' },
            { text: 'Release Process', link: '/project/release-process' },
          ],
        },
      ],

      // ================================
      // SECURITY
      // ================================
      '/security/': [
        {
          text: '<= Guidelines',
          link: '/',
        },
        {
          text: 'Security',
          items: [
            {
              text: 'Secrets Management',
              link: '/security/secrets-management',
            },
            { text: 'Dependency Policy', link: '/security/dependency-policy' },
          ],
        },
      ],

      // ================================
      // TEMPLATES
      // ================================
      '/templates/': [
        {
          text: '<= Guidelines',
          link: '/',
        },
        {
          text: 'Templates',
          items: [
            { text: 'Overview', link: '/templates/index' },
            { text: 'Commit Template', link: '/templates/commit-template' },
            {
              text: 'Pull Request Template',
              link: '/templates/pull-request-template',
            },
            { text: 'Bug Report', link: '/templates/bug-report' },
            { text: 'Feature Request', link: '/templates/feature-request' },
          ],
        },
      ],
    },

    // ================================
    // SITE EXTRAS
    // ================================
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/ohmyopensource/ohmyopensource-guidelines',
      },
    ],

    footer: {
      message: 'Released under the CC0 1.0 Universal License.',
      copyright: 'Copyright © 2024-present OhMyOpenSource Contributors',
    },

    editLink: {
      pattern:
        'https://github.com/ohmyopensource/ohmyopensource-guidelines/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    search: {
      provider: 'local',
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    },

    docFooter: {
      prev: 'Previous',
      next: 'Next',
    },

    outline: {
      label: 'On this page',
      level: [2, 3],
    },

    returnToTopLabel: 'Back to top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Theme',
  },
});
