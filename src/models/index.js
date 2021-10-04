// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Sales, Product } = initSchema(schema);

export {
  Sales,
  Product
};