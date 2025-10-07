import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',

  projectId: 'zo87kq7g',
  dataset: 'projects',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Projects')
              .child(
                S.documentTypeList('project')
                  .title('Projects')
                  .filter('_type == "project"')
              ),
            S.listItem()
              .title('Dribbble Shots')
              .child(
                S.documentTypeList('dribbble')
                  .title('Dribbble Shots')
                  .filter('_type == "dribbble"')
              ),
            S.divider(),
            S.listItem()
              .title('Products')
              .child(
                S.documentTypeList('product')
                  .title('Products')
                  .filter('_type == "product"')
              ),
            S.listItem()
              .title('Categories')
              .child(
                S.documentTypeList('category')
                  .title('Categories')
                  .filter('_type == "category"')
              ),
            S.listItem()
              .title('Customers')
              .child(
                S.documentTypeList('customer')
                  .title('Customers')
                  .filter('_type == "customer"')
              ),
            S.listItem()
              .title('Orders')
              .child(
                S.documentTypeList('order')
                  .title('Orders')
                  .filter('_type == "order"')
              ),
          ]),
    }),
    visionTool(),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
