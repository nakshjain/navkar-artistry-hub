import { BrandingConfig } from './brand.model';

export interface HomePageConfig {
  branding: BrandingConfig;
  sections: HomePageSection[];
}

export interface HomePageSection {
  id: string;
  type: 'grid' | 'carousel' | 'banner' | 'hero';
  title?: string;
  items: SectionItem[];
}

export interface SectionItem {
  alt: string;
  label: string;
  image: string;
  href: string;
}
