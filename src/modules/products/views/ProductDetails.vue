<template>
  <div class="shadow-lg rounded-lg overflow-hidden mb-[100px] p-5">
    <div
      class="product-page bg-gray-100 w-full flex items-center justify-center mt-[70px]"
    >
      <div class="product flex bg-white w-full">
        <img
          :src="product.thumbnail"
          alt="Product Image"
          class="w-2/5 h-full object-cover"
        />
        <div class="p-[30px]">
          <h1 class="text-2xl font-semibold mb-2">{{ product.title }}</h1>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          <p class="text-red-500 font-semibold text-lg mb-2">
            $ {{ calculateDiscountedPrice() }}
          </p>
          <p class="text-gray-500 mb-4">Regular Price: $ {{ product.price }}</p>

          <div class="mt-6">
            <h2 class="text-lg font-semibold mb-2">Leave a Review</h2>
            <div class="flex items-center">
              <span class="text-gray-600 mr-2">Rating:</span>
              <div class="flex space-x-1">
                <span
                  :disabled="!authStore.username"
                  v-for="star in 5"
                  :key="star"
                  :class="[
                    'text-2xl cursor-pointer',
                    star <= reviewRating ? 'text-yellow-500' : 'text-gray-300',
                  ]"
                  @click="setReviewRating(star)"
                >
                  &#9733;
                </span>
              </div>
            </div>
            <textarea
              :disabled="!authStore.username"
              v-model="reviewText"
              rows="3"
              placeholder="Write your review..."
              class="mt-4 w-full p-2 border rounded-lg"
            ></textarea>
            <div class="mt-4">
              <button
                @click="submitReview"
                :disabled="!isValidReview()"
                class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comments mt-6">
      <h2 class="text-lg font-semibold mb-2">User Comments</h2>
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <p>{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "../products.store";
import { useAuthStore } from "../../auth/aut.store";
const productsStore = useProductsStore();
const authStore = useAuthStore();
const route = useRoute();
// console.log(authStore.GET_USERNAME, "username");
const product = ref([]);
const products = ref([]);
const productId = route.params.id;
const comments = ref([]);
onMounted(async () => {
  await productsStore.FETCH_PRODUCTS();
  await productsStore.FETCH_COMMENT(productId);
  products.value = productsStore.GET_PRODUCTS.data.products;
  product.value = products.value.find((item) => item.id == productId);

  comments.value = productsStore.GET_COMMENT.data.comments;
});

const calculateDiscountedPrice = () => {
  return (
    (product.value.price * (100 - product.value.discountPercentage)) /
    100
  ).toFixed(2);
};

let reviewRating = ref(0);
let reviewText = ref("");

const setReviewRating = (rating) => {
  reviewRating.value = rating;
};
const isValidReview = () => {
  return reviewRating.value > 0 && reviewText.value.trim() !== "";
};

const submitReview = async () => {
  if (isValidReview()) {
    const newComment = {
      body: reviewText.value,
      postId: productId,
      userId: 5,
    };
    await productsStore.ADD_COMMENT(newComment);
    comments.value = productsStore.GET_COMMENT.data.comments;

    newComment.body = "";
  }
};
</script>

<style scoped>
.comment {
  border: 1px solid #e2e8f0;
  padding: 10px;
  margin: 10px 0;
  background-color: #f7fafc;
  border-radius: 8px;
}
</style>
