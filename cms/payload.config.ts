import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import { About } from './globals/About';
import { Media } from './collections/Media';
import { Portfolio } from './collections/Portfolio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    Media,
    Portfolio,
  ],
  globals: [
    About,
  ],
  editor: lexicalEditor({}),
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || `file:${path.resolve(__dirname, './database.db')}`,
    },
  }),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',
  sharp,
});
