import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'customer',
  title: 'Customer',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'addresses',
      title: 'Addresses',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Address Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Billing', value: 'billing'},
                  {title: 'Shipping', value: 'shipping'},
                ],
                layout: 'radio',
              },
            },
            {
              name: 'street',
              title: 'Street Address',
              type: 'string',
            },
            {
              name: 'city',
              title: 'City',
              type: 'string',
            },
            {
              name: 'state',
              title: 'State/Province',
              type: 'string',
            },
            {
              name: 'postalCode',
              title: 'Postal Code',
              type: 'string',
            },
            {
              name: 'country',
              title: 'Country',
              type: 'string',
            },
            {
              name: 'isDefault',
              title: 'Default Address',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'orderHistory',
      title: 'Order History',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'order'}],
        },
      ],
      readOnly: true,
    }),
    defineField({
      name: 'totalSpent',
      title: 'Total Spent (BRL)',
      type: 'number',
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: 'customerSince',
      title: 'Customer Since',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active Customer',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'email',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `${title} ${subtitle}`,
        subtitle: subtitle,
      }
    },
  },
})
