import { fileURLToPath } from 'node:url'
import path from 'path'

import { buildConfigWithDefaults } from '../buildConfigWithDefaults.js'
import { Categories } from './collections/Categories.js'
import { CategoriesVersions } from './collections/CategoriesVersions.js'
import { Posts } from './collections/Posts.js'
import { Singular } from './collections/Singular.js'
import { Uploads } from './collections/Uploads.js'
import { Versions } from './collections/Versions.js'
import { seed } from './seed.js'
import { localizedCategoriesSlug, localizedPostsSlug } from './shared.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfigWithDefaults({
  collections: [
    Posts,
    Categories,
    Uploads,
    Versions,
    CategoriesVersions,
    Singular,
    {
      slug: localizedPostsSlug,
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'category',
          type: 'relationship',
          localized: true,
          relationTo: localizedCategoriesSlug,
        },
      ],
    },
    {
      slug: localizedCategoriesSlug,
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'relatedPosts',
          type: 'join',
          collection: localizedPostsSlug,
          on: 'category',
          localized: true,
        },
      ],
    },
  ],
  localization: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
  onInit: async (payload) => {
    if (process.env.SEED_IN_CONFIG_ONINIT !== 'false') {
      await seed(payload)
    }
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
