import { inject, Injectable, DOCUMENT } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { merge, partition, Subject, BehaviorSubject } from 'rxjs';
import { bufferCount, tap, map, filter } from 'rxjs/operators';

import {
  SEO,
  WebPageSeo,
  WepPageType,
  WebPageSeoState,
  ImageType,
  SEOBasic,
} from '@shared';
import { APP_CONFIG_TOKEN } from '../tokens/config.token';

const initWebPageSeoState: WebPageSeoState = {
  data: {
    id: 'default',
    title: '',
    headline: '',
    description: '',
    url: '',
    image: {
      id: 'default',
      src: '',
      alt: '',
      type: ImageType.OGImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  pageType: -1,
};

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  metaTags: string[] = [
    `name='description'`,
    `property='og:image'`,
    `property='og:image:alt'`,
    `property='og:image:width'`,
    `property='og:image:height'`,
    `property='og:title'`,
    `property='og:description'`,
    `property='og:type'`,
    `property='og:site_name'`,
    `property='og:url'`,
    `name='twitter:card'`,
    `name='twitter:title'`,
    `name='twitter:description'`,
    `name='twitter:image'`,
    `name='twitter:image:width'`,
    `name='twitter:image:height'`,
    `name='twitter:site'`,
    `name='twitter:creator'`,
    `name='google-site-verification'`,
  ];

  private _seoData$: BehaviorSubject<WebPageSeoState> = new BehaviorSubject(
    initWebPageSeoState,
  );
  seoData$ = this._seoData$.asObservable().pipe(bufferCount(2, 1));

  private _prepareSeoState$: Subject<WebPageSeo> = new Subject();
  prepareSeoState$ = this._prepareSeoState$.asObservable();

  prepareWPSForBlogCat =
    (pageType: number) =>
    (page: string, category: SEOBasic): WebPageSeoState => {
      const { headline, description, url, image, id, keywords } = category;
      let { title } = category;
      title = page == '1' ? title : `${title} - Page ${page}`;
      return {
        data: { id, title, headline, description, url, image, keywords },
        pageType: pageType,
      };
    };

  prepareWebPageStateForCategory = this.prepareWPSForBlogCat(
    WepPageType.BlogCategoryPage,
  );
  prepareWebPageStateForBlog = this.prepareWPSForBlogCat(WepPageType.BlogPage);

  preparePageState =
    (pageType: number) =>
    (page: SEO): WebPageSeoState => {
      const { title, headline, description, url, image, id, keywords } = page;
      return {
        data: { id, title, headline, description, url, image, keywords },
        pageType: pageType,
      };
    };

  preparePageStateForArticle = this.preparePageState(WepPageType.PostPage);
  preparePageStateForCommonPage = this.preparePageState(WepPageType.CommonPage);

  setBlogCatSeoData =
    (pageType: number) => (page: string, pageData: SEOBasic) => {
      this._prepareSeoState$.next({ page, pageData, pageType: pageType });
    };
  // for blog category page
  setCatSeoData = this.setBlogCatSeoData(WepPageType.BlogCategoryPage);
  // for blog page
  setBlogSeoData = this.setBlogCatSeoData(WepPageType.BlogPage);

  setPageSeoData = (pageType: number) => (pageData: SEOBasic) => {
    this._prepareSeoState$.next({ pageData, pageType: pageType });
  };
  // for blog post page
  setPostSeoData = this.setPageSeoData(WepPageType.PostPage);
  // for pages that are not blog or post, but we still want to have dynamic seo data
  setCommonPageSeoData = this.setPageSeoData(WepPageType.CommonPage);

  private titleService = inject(Title);
  private metaService = inject(Meta);
  private docRef = inject(DOCUMENT);
  readonly appConfig = inject(APP_CONFIG_TOKEN);
  readonly imagesUrl = this.appConfig.imagesUrl;
  readonly defaultImageUrl = this.appConfig.defaultImageUrl;
  readonly domain = this.appConfig.domain;
  readonly blogName = this.appConfig.blogName;
  // readonly twitterName = this.appConfig.twitterName;

  constructor() {
    this.handleSeo();
  }

  setSeoData(seoData: WebPageSeoState) {
    this._seoData$.next(seoData);
  }

  makeSetSeoData(seoData: WebPageSeo) {
    this._prepareSeoState$.next(seoData);
  }

  private handleSeo() {
    const catBlogPage$ = this.prepareSeoState$.pipe(
      filter(
        ({ pageType }) =>
          pageType == WepPageType.BlogPage ||
          pageType == WepPageType.BlogCategoryPage,
      ),
      map(({ pageType, page, pageData }) =>
        this.prepareWPSForBlogCat(pageType)(page || '1', pageData as SEO),
      ),
    );
    const postCommonPage$ = this.prepareSeoState$.pipe(
      filter(
        ({ pageType }) =>
          pageType == WepPageType.PostPage ||
          pageType == WepPageType.CommonPage,
      ),
      map(({ pageType, pageData }) =>
        this.preparePageState(pageType)(pageData as SEO),
      ),
    );

    merge(catBlogPage$, postCommonPage$).subscribe(this._seoData$);

    const [samePageType$, diffPageType$] = partition(
      this.seoData$,
      ([prev, curr]) => prev.pageType === curr.pageType,
    );

    merge(diffPageType$.pipe(tap(() => this.removeMeta())), samePageType$)
      .pipe(
        tap(([, curr]) => this.setTitle(curr.data.title)),
        tap(([, curr]) => this.setCanonical(`${this.domain}${curr.data.url}`)),
        map(([, curr]) => this.prepareMetaData(curr)),
        tap((metaData) => this.setMeta(metaData)),
      )
      .subscribe();
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  setCanonical(href: string): void {
    const existingLink = this.docRef.querySelector(`link[rel='canonical']`);
    if (existingLink) {
      return;
    }
    const link = this.docRef.createElement?.('link');
    if (link) {
      link.rel = 'canonical';
      link.href = href;
      this.docRef.head.appendChild(link);
    }
  }

  // Moz Blog - SEO and Inbound Marketing Blog - Moz    <-- for page 1
  // Moz Blog - Page 3 - Moz

  // Search Intent and SEO: A Quick Guide - Moz         <-- https://moz.com/blog/search-intent-and-seo-a-quick-guide

  // Competitive Research - Moz                         <-- for page 1 https://moz.com/blog/category/competitive-research
  // Competitive Research - page 3 - Moz                <-- for page 3 https://moz.com/blog/category/competitive-research

  // About Moz: What We Do and How We Got Here. - Moz   <-- about page
  // Moz - Products                                     <-- products page

  setMeta(data: MetaDefinition[]) {
    data.forEach((metaTag) => this.metaService.updateTag(metaTag));
  }

  removeMeta(metaTags = this.metaTags) {
    metaTags.forEach((metaTag) => this.metaService.removeTag(metaTag));
  }

  prepareMetaData(pageState: WebPageSeoState): MetaDefinition[] {
    const { pageType, data: pageData } = pageState;

    let metaData: MetaDefinition[] = [];
    switch (pageType) {
      case WepPageType.BlogPage:
        metaData = this.prepareMetaBlog(pageData);
        break;
      case WepPageType.PostPage:
        metaData = this.prepareMetaPost(pageData);
        break;
      case WepPageType.CommonPage:
        metaData = this.prepareMetaPage(pageData);
        break;

      default:
        break;
    }
    return metaData;
  }

  getImageSrc(imagePath: string): string {
    return `${this.imagesUrl}${imagePath || this.defaultImageUrl}`;
  }

  // gather data for meta tags.
  // take data saved in array format. every item is object with data for separate <meta>
  // loop the array and call this.metaService.updateTag(value);

  prepareMetaPost(page: SEOBasic): MetaDefinition[] {
    const imageSrc = this.getImageSrc(page.image?.src);
    return [
      // { name: 'referrer', content: 'no-referrer-when-downgrade'},
      { name: 'description', content: page.description },
      { property: 'og:image', content: imageSrc }, // width: 1200, h: 628
      { property: 'og:image:alt', content: page.image?.alt },
      { property: 'og:title', content: page.headline },
      { property: 'og:description', content: page.description },
      { property: 'og:type', content: 'article' },
      { property: 'og:site_name', content: this.blogName },
      { property: 'og:url', content: `${this.domain}${page.url}` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: page.headline },
      { name: 'twitter:description', content: page.description },
      { name: 'twitter:image', content: imageSrc }, // w: 1024, h: 512
      // { name: 'twitter:site', content: twitterName}, // optional
      // { name: 'twitter:creator', content: twitterName}, // optional
    ];
  }

  prepareMetaPage(page: SEOBasic): MetaDefinition[] {
    const imageSrc = this.getImageSrc(page.image?.src);
    return [
      // { name: 'referrer', content: 'no-referrer-when-downgrade'}, // specific to page non-post
      { name: 'description', content: page.description },
      { property: 'og:image', content: imageSrc },
      { property: 'og:image:alt', content: page.image?.alt },
      { property: 'og:image:width', content: `${page.image?.width || '1200'}` }, // specific to page non-post width: 1200
      {
        property: 'og:image:height',
        content: `${page.image?.height || '630'}`,
      }, // specific to page non-post; height: 630
      { property: 'og:title', content: page.headline },
      { property: 'og:description', content: page.description },
      { property: 'og:type', content: 'website' }, // specific to page non-post
      { property: 'og:site_name', content: this.blogName },
      { property: 'og:url', content: `${this.domain}${page.url}` }, // specific to page non-post
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: page.headline },
      { name: 'twitter:description', content: page.description },
      { name: 'twitter:image', content: imageSrc },
      { name: 'twitter:image:width', content: `${page.image?.width || '800'}` }, // specific to page non-post; width: 800
      {
        name: 'twitter:image:height',
        content: `${page.image?.height || '418'}`,
      }, // specific to page non-post width: 418
      // { name: 'twitter:site', content: this.twitterName }, // optional
      // { name: 'twitter:creator', content: this.twitterName }, // optional
      // { name: 'google-site-verification', content: this.googleVerificationId} // specific to page non-post;
    ];
  }

  prepareMetaBlog(page: SEOBasic): MetaDefinition[] {
    return [
      // { name: 'referrer', content: 'origin-when-cross-origin'},
      { name: 'description', content: page.description },
    ];
  }
  // prepareMetaBlogCategory(): MetaDefinition[] {
  //   return [
  //     // { name: 'referrer', content: 'origin-when-cross-origin'},
  //   ]
  // }
}
