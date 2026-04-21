import { Image } from '../../image/domain/image.model';

export interface SEO {
  id: string;
  title: string; // page title with name of website: "Blog - My Awesome Website"
  headline: string; // headline of the page without name of website: "Blog"
  description: string;
  url?: string;
  image: Image; // should be in DTO
  // imageId: string; // db sets it, but we need to have it in the model for the relation
  keywords?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type MetadataProps = {
  params: Promise<{ id: string; pageURL?: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export interface WebPageSeo {
  pageType: number;
  page?: string;
  pageData: SEOBasic;
}

export interface WebPageSeoState {
  data: SEOBasic;
  pageType: number;
}

// I put them in order from the least number of meta tags to the biggest number of meta tags
// This order is very important because of further comparison
export enum WepPageType {
  BlogCategoryPage,
  BlogPage,
  PostPage,
  CommonPage,
}

export type SEO_DB = Omit<SEO, 'image'>;

export type SEOBasic = Omit<SEO, 'createdAt' | 'updatedAt'>;
