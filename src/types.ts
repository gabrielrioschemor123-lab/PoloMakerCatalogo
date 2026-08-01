export type CategoryType = 
  | 'todos' 
  | 'juguetes'
  | 'utilidades'
  | 'hogar';

export type MaterialType = 
  | 'todos' 
  | 'PLA Plus' 
  | 'PETG';

export interface TechSpecs {
  technology: 'FDM';
  maxDimensions?: string;
  colorsAvailable: string[];
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<CategoryType, 'todos'>;
  material: Exclude<MaterialType, 'todos'>;
  featured: boolean;
  price: number;
  priceDisplay: string;
  images: string[];
  description: string;
  colorsAvailable: string[];
  techSpecs?: TechSpecs;
  tags: string[];
}

export interface FilterState {
  category: CategoryType;
  material: MaterialType;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc';
}

