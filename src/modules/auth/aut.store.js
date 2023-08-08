import { defineStore } from 'pinia'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    hasLayout:true,
    username:''
  }),
  getters: {
    GET_LAYOUT: (s)=>s.hasLayout,
    GET_USERNAME: (s)=>s.username
  },
  actions: {
   async CHANGE_LAYOUT(){
      this.hasLayout = !this.hasLayout;
    },
  async CHANGE_USERNAME(name){
      this.username = name
  },
}
})

