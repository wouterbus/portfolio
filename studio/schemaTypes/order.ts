import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{type: 'customer'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{type: 'product'}],
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'price',
              title: 'Price at Time of Purchase (BRL)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: 'total',
              title: 'Line Total (BRL)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'subtotal',
      title: 'Subtotal (BRL)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'shippingCost',
      title: 'Shipping Cost (BRL)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'tax',
      title: 'Tax (BRL)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'total',
      title: 'Total (BRL)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Processing', value: 'processing'},
          {title: 'Shipped', value: 'shipped'},
          {title: 'Delivered', value: 'delivered'},
          {title: 'Cancelled', value: 'cancelled'},
          {title: 'Refunded', value: 'refunded'},
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Paid', value: 'paid'},
          {title: 'Failed', value: 'failed'},
          {title: 'Refunded', value: 'refunded'},
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
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
      ],
    }),
    defineField({
      name: 'billingAddress',
      title: 'Billing Address',
      type: 'object',
      fields: [
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
      ],
    }),
    defineField({
      name: 'notes',
      title: 'Order Notes',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'shippedDate',
      title: 'Shipped Date',
      type: 'datetime',
    }),
    defineField({
      name: 'deliveredDate',
      title: 'Delivered Date',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'orderNumber',
      subtitle: 'customer.firstName',
      status: 'status',
      total: 'total',
    },
    prepare(selection) {
      const {title, subtitle, status, total} = selection
      return {
        title: `Order #${title}`,
        subtitle: `${subtitle} - ${status} - R$ ${total}`,
      }
    },
  },
  orderings: [
    {
      title: 'Order Date (Newest)',
      name: 'orderDateDesc',
      by: [{field: 'orderDate', direction: 'desc'}],
    },
    {
      title: 'Order Number',
      name: 'orderNumberAsc',
      by: [{field: 'orderNumber', direction: 'asc'}],
    },
  ],
})
