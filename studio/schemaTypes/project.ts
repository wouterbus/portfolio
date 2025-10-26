import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    // Meta (first part order)
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (e.g., 1, 2, 3...)',
      initialValue: 0,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    // Short Description (multilingual)
    defineField({
      name: 'shortDescriptionEn',
      title: 'Short Description (Eye-catcher) - English',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(10).max(300),
    }),
    defineField({
      name: 'shortDescriptionPt',
      title: 'Short Description (Eye-catcher) - Portuguese',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'thumbnail',
      title: 'Small/Featured Box Thumbnail (900x900px)',
      type: 'image',
      options: { hotspot: true },
      description: 'Square image for home/featured boxes (900x900px)',
    }),
    defineField({
      name: 'link',
      title: 'Link To',
      type: 'object',
      fields: [
        { name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.uri({ scheme: ['http','https'] }) },
        { name: 'linkType', title: 'Type', type: 'string', options: { list: [
          {title: 'Website', value: 'website'},
          {title: 'PDF', value: 'pdf'},
          {title: 'GitHub Repo', value: 'github'},
          {title: 'Demo/Preview', value: 'demo'},
        ], layout: 'radio' } },
        { name: 'openInNewTab', title: 'Open in New Tab', type: 'boolean', initialValue: true },
      ],
    }),

    // Home
    defineField({
      name: 'thumbnailVideo',
      title: 'Small/Featured Box Thumbnail (MP4 900x900px)',
      type: 'file',
      options: { accept: 'video/mp4' },
      description: 'Square MP4 for home/featured boxes (900x900px)',
    }),

    // Hero
    defineField({
      name: 'heroBanner',
      title: 'Hero Banner',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    // Catalog
    defineField({
      name: 'catalogBanner',
      title: 'Portfolio Page Banner (3x1)',
      type: 'image',
      options: { hotspot: true },
    }),
    // New multi-select categories field
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          {title: 'Web Design', value: 'web-design'},
          {title: 'UI/UX Design', value: 'ui-ux-design'},
          {title: 'Graphic Design', value: 'graphic-design'},
        ],
        // No layout specified to render as checkboxes in Studio
      },
      validation: (Rule) => Rule.required().min(1),
    }),

    // Content
    defineField({
      name: 'productBanner',
      title: 'Portfolio Piece Banner (3x2)',
      type: 'image',
      options: { hotspot: true },
    }),
    // Body Section (multilingual, optional)
    defineField({
      name: 'bodyEn',
      title: 'Body Section (English)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          type: 'code',
          title: 'Code Block',
          options: {
            language: 'html',
            languageAlternatives: [
              {title: 'HTML', value: 'html'},
              {title: 'CSS', value: 'css'},
              {title: 'JavaScript', value: 'javascript'},
              {title: 'TypeScript', value: 'typescript'},
              {title: 'JSON', value: 'json'},
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'bodyPt',
      title: 'Body Section (Portuguese)',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: {hotspot: true} },
        { type: 'code', title: 'Code Block' },
      ],
    }),
    defineField({
      name: 'tools',
      title: 'Tools Used',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'downloadables',
      title: 'Downloadable Files',
      type: 'array',
      of: [
        {
          type: 'file',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
          ]
        }
      ],
      description: 'PDF, TTF, OTF, ZIP etc.'
    }),

    // Galleries (keep adjacent)
    defineField({
      name: 'desktopImages',
      title: 'Desktop Project Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 3,
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'asset',
            },
          },
        }
      ],
      description: 'Bulk loader for desktop project showcase images',
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'mobileImages',
      title: 'Mobile Project Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 3,
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'asset',
            },
          },
        }
      ],
      description: 'Bulk loader for mobile project showcase images',
      options: {
        layout: 'grid',
      },
    }),

    // Flags
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Mark this project as featured to highlight it on your portfolio',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      categories: 'categories',
      media: 'thumbnail',
    },
    prepare(selection) {
      const {title, categories, media} = selection
      const cats = Array.isArray(categories) && categories.length > 0 ? categories : []
      const subtitle = cats.length ? `Categories: ${cats.join(', ')}` : 'No categories'
      return {
        title: title,
        subtitle,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Order (Low to High)',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})
