import { defineConfig } from 'vitepress'

const base = process.env.BASE_PATH ?? '/Kurblanc-Wiki/'

export default defineConfig({
  base,
  title: 'Kurblanc Creator Wiki',
  description: 'Add blocks, items, entities and textures to Kurblanc.',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#10120f' }],
    ['link', { rel: 'icon', href: `${base}favicon.svg` }],
  ],
  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
  },
  themeConfig: {
    search: { provider: 'local' },
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Blocks', link: '/blocks/' },
      { text: 'Reference', link: '/reference/' },
      { text: 'Examples', link: '/examples/' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Start here', link: '/guide/' },
          { text: 'Pack anatomy', link: '/guide/pack-anatomy' },
          { text: 'Load a pack', link: '/guide/load-a-pack' },
          { text: 'Your first block', link: '/guide/first-block' },
        ],
      },
      {
        text: 'Blocks',
        items: [
          { text: 'Overview', link: '/blocks/' },
          { text: 'Layers & collision', link: '/blocks/layers-and-collision' },
          { text: 'Textures & tiling', link: '/blocks/textures-and-tiling' },
          { text: 'Light', link: '/blocks/light' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'Components', link: '/reference/' },
          { text: 'Block components', link: '/reference/components/blocks' },
          { text: 'Validation errors', link: '/reference/validation-errors' },
          { text: 'Limits', link: '/reference/limits' },
          { text: 'Changelog', link: '/reference/changelog' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'A block from scratch', link: '/examples/a-block-from-scratch' },
          { text: 'The sample pack', link: '/examples/sample-pack' },
        ],
      },
      { text: 'Contribute', link: '/contribute' },
    ],
    editLink: {
      pattern: 'https://github.com/cen0b-dev/Kurblanc-Wiki/edit/main/docs/:path',
      text: 'Edit this page',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/cen0b-dev/Kurblanc-Wiki' }],
  },
})
