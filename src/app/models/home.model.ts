import { Branding } from './branding.model';

export interface HomePageConfig {
  tenantId: string
  branding: Branding
  sections: Section[]
  metadata?: MetaData
  version: number
  updatedAt: string
}

export interface Section {
  id: string
  type: 'grid' | 'carousel' | 'banner' | 'hero' | 'promo' | 'custom'
  title?: string
  subtitle?: string
  layout?: Record<string, any>
  items: SectionItem[]
}

export interface SectionItem {
  key?: string
  alt?: string
  label?: string
  image?: string
  href?: string
  description?: string
  tag?: string
  extra?: Record<string, any>
}

export interface MetaData {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
}
