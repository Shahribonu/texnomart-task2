import { defineStore } from 'pinia'
import { fetchAllProducts } from './products.api';
import { fetchComment } from './products.api';
import { addNewComment } from './products.api';
import { addNewProduct } from './products.api';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products:[],
    comments:[],
    isOpen:false
  
  }),
  getters: {
    GET_PRODUCTS: (s)=>s.products,
    GET_COMMENT: (s)=>s.comments,
    GET_IS_OPEN: (s)=>s.isOpen

  },
  actions: {
   async FETCH_PRODUCTS(){
      this.products = await fetchAllProducts()
    },
    async FETCH_COMMENT(id){
      this.comments = await fetchComment(id)
    },
    async ADD_COMMENT(newComment) {
      try {
       await addNewComment(newComment);
        this.comments = fetchComment(id);
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },

    async ADD_PRODUCT(newProduct) {
      await addNewProduct(newProduct);
      this.products = await fetchAllProducts();
    },
    async CHANGE_IS_OPEN() {
     this.isOpen = !this.isOpen;
    },
  },
})

