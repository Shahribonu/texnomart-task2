<template>
  <div class="addProduct bg-white p-5 shadow-md">
    <v-form @submit.prevent="addProduct">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="product.title" label="Title"></v-text-field>

          <v-text-field v-model="product.brand" label="Brand"></v-text-field>

          <v-text-field
            v-model="product.description"
            label="Description"
          ></v-text-field>

          <v-text-field
            v-model="product.category"
            label="category"
          ></v-text-field>

          <v-text-field v-model="product.price" label="price"></v-text-field>

          <v-text-field
            v-model="product.thumbnail"
            label="thumbnail"
          ></v-text-field>

          <v-text-field
            v-model="product.discountPercentage"
            label="discountPercentage"
          ></v-text-field>

          <v-text-field v-model="product.rating" label="rating"></v-text-field>

          <v-btn type="submit" color="primary">Add product</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import { useProductsStore } from "../products.store";
import { useToast } from "vue-toastification";
const productsStore = useProductsStore();
const items = ref([]);
const toast = useToast();

onMounted(async () => {
  await productsStore.FETCH_PRODUCTS();
  items.value = productsStore.GET_PRODUCTS.data;
  console.log(items.value);
});

const product = ref({
  id: items.value.length,
  title: "",
  category: "",
  description: "",
  price: null,
  discountPercentage: "",
  brand: "",
  rating: "",
  thumbnail: "",
});

const emit = defineEmits();
async function addProduct() {
  if (
    !product.value.title ||
    !product.value.brand ||
    !product.value.category ||
    !product.value.description ||
    !product.value.price ||
    !product.value.discountPercentage ||
    !product.value.rating ||
    !product.value.thumbnail
  ) {
    toast.error("Fill the fields");
    return;
  }

  emit("product-added", product.value);
  console.log(product.value, "new product");

  product.value = {
    title: "",
    category: "",
    description: "",
    price: null,
    discountPercentage: "",
    brand: "",
    rating: "",
    thumbnail: "",
  };
  productsStore.CHANGE_IS_OPEN();
  console.log(productsStore.GET_IS_OPEN);

  await productsStore.FETCH_PRODUCTS();
  console.log(productsStore.GET_PRODUCTS);
}
</script>

<style scoped>
.addProduct {
  position: absolute;
  right: 0;
  top: 58px;
  width: 500px !important;
  z-index: 1000;
}
v-text-field {
  margin: 0;
}
</style>
