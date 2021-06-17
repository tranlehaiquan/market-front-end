import { SanityImageObject } from "@sanity/image-url/lib/types/types";

export type Product = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  slug: Slug;
  title: string;
  price: number;
  salePrice: number;
  images: SanityImageObject[]
};

export type Slug = {
  _key: string;
  _type: string;
  current: string;
};

export interface Category {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _key: string;
  title: string;
  slug: Slug;
  description: string;
}
