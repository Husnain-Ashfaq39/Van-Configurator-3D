import {create} from 'zustand';
import { productConfig } from '../data/productConfig';

export const useProductStore = create((set, get) => ({
  // Initialize products based on productConfig with additional properties.
  products: Object.entries(productConfig).map(([id, config]) => ({
    id,
    ...config,
    visible: false,
    isFavorite: false,
  })),
  // Array for products added to the van with quantity.
  vanProducts: [],
  
  // Action: Add a product to the van or increase its quantity if already added.
  addProductToVan: (product) =>
    set((state) => {
      const existingProduct = state.vanProducts.find((p) => p.id === product.id);
      if (existingProduct) {
        return {
          vanProducts: state.vanProducts.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      } else {
        return {
          vanProducts: [...state.vanProducts, { ...product, quantity: 1 }],
        };
      }
    }),
    
  // Action: Remove a product from the van or decrease its quantity.
  removeProductFromVan: (product) =>
    set((state) => {
      const existingProduct = state.vanProducts.find((p) => p.id === product.id);
      if (existingProduct && existingProduct.quantity > 1) {
        return {
          vanProducts: state.vanProducts.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
          ),
        };
      } else {
        return {
          vanProducts: state.vanProducts.filter((p) => p.id !== product.id),
        };
      }
    }),
    
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
    get().vanProducts.reduce((total, product) => total + product.price * product.quantity, 0),
  
  // Computed getter for the quantity of products added.
  getQuantity: () => get().vanProducts.reduce((total, product) => total + product.quantity, 0),
}));
