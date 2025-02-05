import {create} from 'zustand';
import { productConfig } from '../data/productConfig';

export const  useProductStore = create((set, get) => ({
  // Initialize products based on productConfig with additional properties.
  products: Object.entries(productConfig).map(([id, config]) => ({
    id,
    ...config,
    visible: false,
    isFavorite: false,
  })),
  // Array for products added to the van.
  vanProducts: [],
  
  // Action: Add a product to the van.
  addProductToVan: (product) =>
    set((state) => ({
      vanProducts: [...state.vanProducts, product],
    })),
    
  // Action: Remove a product from the van.
  removeProductFromVan: (product) =>
    set((state) => ({
      vanProducts: state.vanProducts.filter((p) => p.id !== product.id),
    })),
    
  // Action: Toggle the product's visibility.
  toggleProductVisibility: (id) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id
          ? { ...product, visible: !product.visible }
          : product
      ),
    })),
    
  // Action: Toggle the product's favorite status.
  toggleFavorite: (id) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      ),
    })),
  
  // Computed getter for total price.
  getTotalPrice: () =>
    get().vanProducts.reduce((total, product) => total + product.price, 0),
  
  // Computed getter for the quantity of products added.
  getQuantity: () => get().vanProducts.length,
}));

