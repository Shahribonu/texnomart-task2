<template>
  <div class="product-list mx-4 mt-[100px] mb-[100px]">
    <!-- <AddProduct @product-added="handleProductAdded" :isOpen="isOpen" /> -->
    <div
      class="card m-3"
      v-for="(product, index) in displayedProducts"
      :key="index"
      @click="goToProductDetail(product.id)"
    >
      <img :src="product.images[2]" alt="" class="card-image" />
      <div class="card-content bg-gray-50">
        <h2 class="card-title">{{ product.title }}</h2>
        <button class="card-button">Learn More</button>
      </div>
    </div>

    <pagination
      :total-items="totalProducts"
      :current-page="currentPage"
      @page-change="updatePage"
    ></pagination>
  </div>
</template>

<script setup>
import Pagination from "../components/Pagination.vue";
import AddProduct from "../components/AddProduct.vue";
import { ref, onMounted } from "vue";
import { useProductsStore } from "../products.store";
import { useRouter } from "vue-router";
const router = useRouter();
const productsStore = useProductsStore();
const isOpen = productsStore.GET_IS_OPEN;
// console.log(isOpen);
const products = ref([]);
const displayedProducts = ref([]);

onMounted(async () => {
  await productsStore.FETCH_PRODUCTS();
  products.value = productsStore.GET_PRODUCTS.data;

  const startIndex = (currentPage.value - 1) * 12;
  const endIndex = startIndex + 12;
  displayedProducts.value = products.value.products.slice(startIndex, endIndex);
});

const totalProducts = 30;
let currentPage = ref(1);

const updatePage = (pageNumber) => {
  currentPage.value = pageNumber;

  const startIndex = (currentPage.value - 1) * 12;
  const endIndex = startIndex + 12;
  displayedProducts.value = products.value.products.slice(startIndex, endIndex);
};

const goToProductDetail = (productId) => {
  router.push(`/products/${productId}`);
};

function handleProductAdded(newProduct) {
  productsStore.ADD_PRODUCT(newProduct);
}
</script>

<style>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
pagination {
  display: flex;
}
.card {
  width: calc(33.33% - 20px);
  margin: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
}
.card:hover {
  transform: translateY(-2px);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
}
.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.card-description {
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 1rem;
}

.card-button {
  padding: 0.5rem 1rem;
  background-color: #404cd1;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
