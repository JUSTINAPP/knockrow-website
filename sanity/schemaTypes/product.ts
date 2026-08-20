import { defineField, defineType } from 'sanity'

// Editable in the Studio at /studio once this project is connected to a real
// Sanity dataset (see src/lib/sanity.ts for the fallback behaviour while it
// isn't). Matches the shape of src/data/products.ts, plus an `order` field
// since Sanity documents don't have inherent ordering.
export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short line shown under the name on the Range card.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Longer copy, for a future product detail page.',
    }),
    defineField({
      name: 'price',
      title: 'Price (6 bottle case)',
      type: 'string',
      description: 'Formatted for display, e.g. "$540.00". Kept as text for now — the checkout API takes a numeric priceCents field below.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceCents',
      title: 'Price in cents (AUD)',
      type: 'number',
      description: 'Used to create the Stripe Checkout session. e.g. 54000 for $540.00.',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'size',
      title: 'Size / case makeup',
      type: 'string',
      description: 'e.g. "6 x 700ml case" or "3 x Vodka + 3 x Maca Da Mia (6 x 700ml)".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Primary image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caseImage',
      title: 'Hover / case image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional — shown on hover/focus (e.g. the full 6-pack shot).',
    }),
    defineField({
      name: 'soldOut',
      title: 'Sold out',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers show first in the Range section.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'price', media: 'image' },
  },
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
