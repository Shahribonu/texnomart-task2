<template>
  <div class="navbar flex justify-between align-center p-5 text-white">
    <router-link to="/" class="navbar-logo text-xl decoration-none text-white"
      >LOGO
    </router-link>
    <div>
      <router-link
        class="register-button py-2 px-4 bold border-none border-r-2 text-white cursor-pointer"
        to="/register"
      >
        Register
      </router-link>

      <!-- <button
        :disabled="!authStore.username"
        @click="openForm"
        v-if="productsStore.GET_IS_OPEN"
      >
        Add New Product
      </button> -->
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "../modules/auth/aut.store";
import { useProductsStore } from "../modules/products/products.store";
const productsStore = useProductsStore();
const authStore = useAuthStore();

const openForm = async () => {
  await productsStore.CHANGE_IS_OPEN();
  console.log(productsStore.GET_IS_OPEN);
};
</script>
