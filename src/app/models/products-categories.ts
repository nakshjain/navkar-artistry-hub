import {Category} from "./products.types";

export const categories:Category[]=[
  {
    id: 'paintings',
    name: 'Paintings',
    link: 'shop/paintings',
  },
  {
    id: 'home-decor',
    name: 'Home Decor',
    link: 'shop/home-decor',
  },
  {
    id: 'jewellery',
    name: 'Jewellery',
    link: 'shop/jewellery',
  }
]
export const subCategories:{ [key: string]: Category[] } = {
  'Paintings': [
    { name: 'Madhubani Paintings', id: 'madhubani-paintings', link: '/madhubani-paintings' },
    { name: 'Abstract Paintings', id: 'abstract-paintings', link: '/abstract-paintings' }
  ],
  'Home Decor': [
    { name: 'Clocks', id: 'clocks', link: '/clocks' },
    { name: 'Candles', id: 'candles', link: '/candles' },
    { name: 'Trays', id: 'trays', link: '/trays' },
    { name: 'Puja Items', id: 'puja-items', link: '/puja-items' },
    { name: 'Key Chains', id: 'key-chains', link: '/key-chains' },
    { name: 'Event Decor', id: 'event-decor', link: '/event-decor' },
    { name: 'Bathroom Set', id: 'bathroom-set', link: '/bathroom-set' }
  ],
  'Jewellery': [
    { name: 'Bracelets', id: 'bracelets', link: '/bracelets' },
    { name: 'Earrings', id: 'earrings', link: '/earrings' },
    { name: 'Necklaces', id: 'necklaces', link: '/necklaces' },
  ]
};


