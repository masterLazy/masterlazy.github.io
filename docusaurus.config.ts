import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: 'masterLazy',
    favicon: 'img/favicon.ico',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    // Set the production url of your site here
    url: 'https://masterLazy.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'masterLazy', // Usually your GitHub org/user name.
    projectName: 'masterLazy.github.io', // Usually your repo name.

    onBrokenLinks: 'throw',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex],
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        colorMode: {
            respectPrefersColorScheme: true,
        },
        navbar: {
            title: "📚 mNotebook",
            items: [
                {
                    to: '/docs/tags',
                    position: 'left',
                    label: '🏷️',
                },
                {
                    to: '/docs/quick/intro',
                    position: 'left',
                    label: '速查',
                },
                {
                    to: '/docs/oi/intro',
                    position: 'left',
                    label: '算法竞赛',
                },
                {
                    to: '/docs/native-stacks/intro',
                    label: '原生技术栈',
                },
                {
                    to: '/docs/web-stacks/intro',
                    label: 'Web 技术栈',
                },
                {
                    href: 'https://github.com/masterLazy/masterlazy.github.io',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'light',
            links: [
                {
                    title: 'My Accounts',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/masterLazy',
                        },
                        {
                            label: 'Bilibili',
                            href: 'https://space.bilibili.com/187875705',
                        }
                    ],
                },
                {
                    title: 'Are you looking for…?',
                    items: [
                        {
                            label: 'dsapps',
                            to: 'https://masterLazy.github.io/dsapps/',
                        },
                        {
                            label: 'TwoThreeBlocks Wiki',
                            href: 'http://wiki.ocks.top/',
                        },
                    ],
                },
            ],
            copyright: `© ${new Date().getFullYear()} masterLazy · Built with Docusaurus · <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>`,
        },
        prism: {
            theme: prismThemes.oneLight,
            darkTheme: prismThemes.oneDark,
            additionalLanguages: ['java', 'csharp'],
        },
        sidebar: {
            autoCollapseCategories: true,
        },
    } satisfies Preset.ThemeConfig,
    stylesheets: [
        {
            href: '/katex/katex.min.css',
            type: 'text/css',
        },
    ],
};

export default config;
