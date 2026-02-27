import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    // Use string names for Turbopack compatibility (functions are not serializable)
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['rehype-slug'],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)