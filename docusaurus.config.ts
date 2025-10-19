import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: 'mNotebook',
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
                    to: '/docs/category/速查',
                    position: 'left',
                    label: '速查',
                },
                {
                    to: '/docs/category/程序设计',
                    position: 'left',
                    label: '程序设计',
                },
                {
                    to: '/docs/category/算法竞赛',
                    position: 'left',
                    label: '算法竞赛',
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
                    title: 'Notebooks',
                    items: [
                        {
                            label: '程序设计 | Programing',
                            to: '/docs/category/程序设计',
                        },
                        {
                            label: '算法竞赛 | OI',
                            to: '/docs/category/算法竞赛',
                        }
                    ],
                },
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
            theme: prismThemes.github,
            darkTheme: prismThemes.oneDark,
            additionalLanguages: ['java', 'csharp'],
        },
        sidebar: {
            autoCollapseCategories: true,
        },
    } satisfies Preset.ThemeConfig,
    stylesheets: [
        {
            href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
            type: 'text/css',
            integrity:
                'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
            crossorigin: 'anonymous',
        },
    ],
};

export default config;
