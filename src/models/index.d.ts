import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type SalesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Sales {
  readonly id: string;
  readonly Email?: string;
  readonly Total?: number;
  readonly Amount?: string;
  readonly Products?: string;
  readonly Date?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Sales, SalesMetaData>);
  static copyOf(source: Sales, mutator: (draft: MutableModel<Sales, SalesMetaData>) => MutableModel<Sales, SalesMetaData> | void): Sales;
}

export declare class Product {
  readonly id: string;
  readonly Description?: string;
  readonly Units?: string;
  readonly Presentation?: string;
  readonly Stock?: number;
  readonly Price?: number;
  readonly Img?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Product, ProductMetaData>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product, ProductMetaData>) => MutableModel<Product, ProductMetaData> | void): Product;
}