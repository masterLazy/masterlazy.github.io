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

    onBrokenLinks: 'ignore', // Linking to /blog/rss.xml

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
                    showLastUpdateTime: true,
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex],
                },
                blog: {
                    blogSidebarCount: 20,
                    showReadingTime: true,
                    readingTime: ({ content, locale, frontMatter, defaultReadingTime }) =>
                        defaultReadingTime({
                            content,
                            locale,
                            options: { wordsPerMinute: 300 },
                        }),
                    feedOptions: {
                        type: ['rss'],
                        limit: 20,
                        copyright: `Copyright © ${new Date().getFullYear()} masterLazy`,
                    },
                },
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
            title: 'mNotebook',
            items: [
                {
                    to: '/docs/tags',
                    className: 'header-link header-tags-link',
                },
                { to: '/docs/jot/intro', label: '随笔', },
                { to: 'blog', label: 'Blog' },
                {
                    type: 'dropdown',
                    label: '计算机科学',
                    items: [
                        {
                            to: '/docs/se/intro',
                            label: '软件工程',
                        },
                        {
                            to: '/docs/oi/intro',
                            label: '算法竞赛',
                        },
                    ],
                },
                {
                    type: 'dropdown',
                    label: '学科笔记',
                    items: [
                        {
                            to: '/docs/math/intro',
                            label: '数学',
                        },
                        {
                            to: '/docs/english/intro',
                            label: 'English',
                        },
                        {
                            to: '/docs/chemistry/intro',
                            label: '化学',
                        }
                    ],
                },
                {
                    type: 'dropdown',
                    label: '艺术',
                    items: [
                        {
                            to: '/docs/moe/intro',
                            label: '萌物研究',
                        },
                        {
                            to: '/docs/music/intro',
                            label: '音乐',
                        },
                    ],
                },
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
                            to: '/docs/intro',
                        },
                        {
                            label: '标签列表',
                            to: '/docs/tags',
                        },
                        {
                            label: 'RSS 订阅',
                            to: '/blog/rss.xml'
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
            additionalLanguages: ['java', 'csharp', 'bash'],
        },
        sidebar: {
            autoCollapseCategories: true,
        },
    } satisfies Preset.ThemeConfig,
    stylesheets: [
        {
            href: 'https://s4.zstatic.net/npm/katex@0.16.25/dist/katex.min.css',
            type: 'text/css',
        },
        /*{
            href: '/katex/katex.min.css',
            type: 'text/css',
        },*/
    ],
};

export default config;
