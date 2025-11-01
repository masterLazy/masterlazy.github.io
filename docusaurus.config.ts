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
            logo: {
                alt: 'Site Logo',
                src: '/img/favicon.webp',
                target: '_self',
            },
            title: 'mNotebook',
            items: [
                {
                    to: '/docs/tags',
                    className: 'header-link header-tags-link',
                },
                {
                    to: '/docs/jot/intro',
                    label: '随笔',
                },
                //
                {
                    type: 'dropdown',
                    label: '计算机科学',
                    items: [
                        {
                            to: '/docs/oi/intro',
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
                    ],
                },
                //
                {
                    type: 'dropdown',
                    label: '文化课',
                    items: [
                        {
                            to: '/docs/math/intro',
                            label: '数学',
                        }
                    ],
                },
                //
                {
                    href: 'https://github.com/masterLazy/masterlazy.github.io',
                    position: 'right',
                    className: 'header-link header-github-link',
                },
            ],
        },
        footer: {
            style: 'light',
            links: [
                {
                    title: 'mNotebook',
                    items: [
                        {
                            label: '所有笔记',
                            to: '/docs/category/随笔',
                        },
                        {
                            label: '标签列表',
                            to: '/docs/tags',
                        }
                    ],
                },
                {
                    title: '我的账号',
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
                    title: '你是否在找',
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
