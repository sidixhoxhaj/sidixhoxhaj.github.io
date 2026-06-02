import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: false,
  turbopack: {
    root: import.meta.dirname,
  },
}

export default withPayload(nextConfig)
