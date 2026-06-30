import { config, fields, collection } from '@keystatic/core';

const isDev = process.env.NODE_ENV === 'development';

export default config({
  // storage: isDev
  //   ? { kind: 'local' }
  //   : {
    storage: {
      kind: 'github',
      repo: {
        owner: 'talhaticx',
        name: 'meds-ee-uet'
      }
      // repo: 'talhaticx/meds-ee-uet'
    },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedAt: fields.datetime({ label: 'Published at', validation: { isRequired: true } }),
        author: fields.relationship({ label: 'Author', collection: 'members' }),
        mainImage: fields.image({ label: 'Main image', directory: 'public/images/posts', publicPath: '/meds-ee-uet/images/posts/' }),
        mainImageAlt: fields.text({ label: 'Main image alt text' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/meds-ee-uet/images/posts/',
            },
          },
        }),
      },
    }),
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Active', value: 'Active' },
            { label: 'Completed', value: 'Completed' },
          ],
          defaultValue: 'Active',
        }),
        abstract: fields.text({ label: 'Abstract', multiline: true }),
        techStack: fields.array(fields.text({ label: 'Tech' }), { label: 'Tech Stack', itemLabel: props => props.value }),
        heroImage: fields.image({ label: 'Hero image', directory: 'public/images/projects', publicPath: '/meds-ee-uet/images/projects/' }),
        heroImageAlt: fields.text({ label: 'Hero image alt text' }),
        featuredOrder: fields.integer({ label: 'Featured Order' }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/projects',
              publicPath: '/meds-ee-uet/images/projects/',
            },
          },
        }),
      },
    }),
    members: collection({
      label: 'Members',
      slugField: 'name',
      path: 'src/content/members/*',
      format: 'yaml',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Role' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        linkedin: fields.url({ label: 'LinkedIn' }),
        image: fields.image({ label: 'Image', directory: 'public/images/members', publicPath: '/meds-ee-uet/images/members/' }),
        imageAlt: fields.text({ label: 'Image alt text' }),
        sortOrder: fields.integer({ label: 'Sort Order' }),
      },
    }),
    publications: collection({
      label: 'Publications',
      slugField: 'title',
      path: 'src/content/publications/*',
      format: 'yaml',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        authors: fields.text({ label: 'Authors' }),
        publishedDate: fields.date({ label: 'Published Date' }),
        venue: fields.text({ label: 'Venue' }),
        link: fields.url({ label: 'Link' }),
      },
    }),
    activities: collection({
      label: 'Activities',
      slugField: 'title',
      path: 'src/content/activities/*',
      format: 'yaml',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.datetime({ label: 'Date', validation: { isRequired: true } }),
        location: fields.text({ label: 'Location' }),
        description: fields.text({ label: 'Description', multiline: true }),
        imageGallery: fields.array(fields.object({
          image: fields.image({ label: 'Image', directory: 'public/images/activities', publicPath: '/meds-ee-uet/images/activities/' }),
          alt: fields.text({ label: 'Alt text' })
        }), { label: 'Image Gallery', itemLabel: props => props.fields.alt.value || 'Image' }),
      },
    }),
  },
});
